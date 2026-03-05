---
name: changelogger
description: Automatically updates the CHANGELOG.md file based on commits following the Conventional Commits standard. Use this skill whenever you are about to make a commit or after a commit is made, to ensure the history is documented.
---

# Changelogger Skill

This skill automates the maintenance of a `CHANGELOG.md` file. It parses commit messages following the **Conventional Commits** format and categorizes changes under the appropriate headers.

## Changelog Format

The changelog follows the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) standard.

### Sections:
- `Added`: for new features.
- `Changed`: for changes in existing functionality.
- `Deprecated`: for soon-to-be removed features.
- `Removed`: for now removed features.
- `Fixed`: for any bug fixes.
- `Security`: in case of vulnerabilities.

## Usage

When preparing to commit changes:
1.  Analyze the changes made.
2.  Determine the **Conventional Commit** type and scope.
3.  Use the `changelogger` to append the change to the `CHANGELOG.md` file under the `[Unreleased]` section.

## Categorization Logic

Commit types mapping:
- `feat` -> `Added`
- `fix` -> `Fixed`
- `perf` -> `Changed`
- `refactor` -> `Changed`
- `style` -> `Changed` (if significant)
- `docs` -> `Added` or `Changed` (if significant)

## Script Reference

The skill uses a helper script located at `./scripts/update_changelog.ps1` to perform the actual file modification.
