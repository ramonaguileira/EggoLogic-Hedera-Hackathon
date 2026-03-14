const { TokenMintTransaction, TokenAssociateTransaction, TransferTransaction, TopicMessageSubmitTransaction, TokenId, AccountId, AccountBalanceQuery, PrivateKey } = require('@hashgraph/sdk');
const { getClient: getHederaClient } = require('../config/hedera');
const config = require('../config/env');
const logger = require('../utils/logger');

async function mintEggocoins(amount) {
  const client = getHederaClient();
  const amountLowestDenom = Math.round(amount * 100); // 2 decimals
  
  const tx = await new TokenMintTransaction()
    .setTokenId(TokenId.fromString(config.hedera.eggocoinsTokenId))
    .setAmount(amountLowestDenom)
    .execute(client);

  const receipt = await tx.getReceipt(client);
  logger.info(`HTS: Minted ${amount} EGGOCOINS (status: ${receipt.status})`);
  return { amount, status: receipt.status.toString(), txId: tx.transactionId.toString() };
}

async function transferEggocoins(supplierAccountId, amount) {
  const client = getHederaClient();
  const amountLowestDenom = Math.round(amount * 100);
  const tokenId = TokenId.fromString(config.hedera.eggocoinsTokenId);
  const treasuryId = AccountId.fromString(config.hedera.treasuryAccountId);
  const supplierId = AccountId.fromString(supplierAccountId);

  const tx = await new TransferTransaction()
    .addTokenTransfer(tokenId, treasuryId, -amountLowestDenom)
    .addTokenTransfer(tokenId, supplierId, amountLowestDenom)
    .execute(client);

  const receipt = await tx.getReceipt(client);
  logger.info(`HTS: Transferred ${amount} EGGOCOINS to ${supplierAccountId}`);
  return { status: receipt.status.toString(), txId: tx.transactionId.toString() };
}

async function publishHcsMessage(topicId, message) {
  const client = getHederaClient();
  const messageStr = JSON.stringify(message);
  
  try {
    const tx = await new TopicMessageSubmitTransaction()
      .setTopicId(topicId)
      .setMessage(messageStr)
      .execute(client);
    const receipt = await tx.getReceipt(client);
    return { status: receipt.status.toString(), txId: tx.transactionId.toString() };
  } catch (err) {
    logger.error(`HCS Error: ${err.message}`);
    throw err;
  }
}

async function publishAuditLog(topicId, data) {
  return publishHcsMessage(topicId, {
    ...data,
    timestamp: new Date().toISOString()
  });
}

async function getTokenBalance(accountId, tokenId) {
  const client = getHederaClient();
  try {
    const query = new AccountBalanceQuery()
      .setAccountId(AccountId.fromString(accountId));
    const balance = await query.execute(client);
    const tokenBalance = balance.tokens.get(TokenId.fromString(tokenId));
    return tokenBalance ? tokenBalance.toNumber() / 100 : 0;
  } catch (err) {
    logger.error(`Error fetching token balance: ${err.message}`);
    return 0;
  }
}

module.exports = {
  mintEggocoins,
  transferEggocoins,
  publishHcsMessage,
  publishAuditLog,
  getTokenBalance
};
