---
name: committer
description: Commits changes to the repository in a structured way, ensuring CHANGELOG.md is updated.
---

# Committer Skill

This skill ensures that all commits to the repository follow a structured format based on **Conventional Commits** and that the **CHANGELOG.md** is kept up to date.

## Mandatory Pre-Commit Step: Update Changelog

Before finalizing any commit message, you **must** update the `CHANGELOG.md` file using the `changelogger` skill.

1.  Analyze your changes.
2.  Determine the appropriate Conventional Commit type and scope.
3.  Trigger the `changelogger` skill to add an entry to the `[Unreleased]` section of `CHANGELOG.md`.

Once the changelog is updated, proceed with the commit message format below.

## Commit Message Format

Every commit message must consist of a **header**, a **body**, and optionally a **footer**.

### 1. Header (Subject Line)
The header must follow this pattern: `<type>(<scope>): <description>`

- **Max length**: 50 characters.
- **Types**:
  - `feat`: A new feature.
  - `fix`: A bug fix.
  - `docs`: Documentation only changes.
  - `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
  - `refactor`: A code change that neither fixes a bug nor adds a feature.
  - `perf`: A code change that improves performance.
  - `test`: Adding missing tests or correcting existing tests.
  - `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation.

### 2. Body (Description)
The body must be used to provide an **extensive explanation** of the changes.

- **Requirement**: Explain the *what* and *why* of the changes, not just the *how*.
- **Length**: No strict limit, but it must be descriptive enough to understand the impact of the changes without reading the code.
- **Formatting**: Separate the body from the header with a blank line.

### 3. Examples

#### Feature Commit
```text
feat(auth): add google oauth2 support

Implemented the Google OAuth2 provider using the passport-google-oauth20
strategy. This allows users to sign in using their Google accounts.
Updated the user model to store the googleId and added a new route
for the authentication callback.
```

#### Bug Fix Commit
```text
fix(api): resolve timeout on large reports

Optimized the SQL query used to generate monthly reports by adding
an index on the transaction_date column. Previously, the query
would time out when processing more than 100k records.
```

