param (
    [Parameter(Mandatory=$true)]
    [string]$Type,

    [Parameter(Mandatory=$true)]
    [string]$Description,

    [string]$Scope = "",

    [string]$ChangelogPath = "CHANGELOG.md"
)

# Mapping Conventional Commit types to Changelog sections
$SectionMap = @{
    "feat"     = "Added"
    "fix"      = "Fixed"
    "perf"     = "Changed"
    "refactor" = "Changed"
    "style"    = "Changed"
    "docs"     = "Changed"
}

$Section = $SectionMap[$Type.ToLower()]
if (-not $Section) {
    $Section = "Changed" # Default for other types
}

$Entry = "- "
if ($Scope) {
    $Entry += "**$Scope**: "
}
$Entry += $Description

if (-not (Test-Path $ChangelogPath)) {
    # Create a new CHANGELOG.md if it doesn't exist
    $InitialContent = @"
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
### Changed
### Fixed
"@
    Set-Content -Path $ChangelogPath -Value $InitialContent -Encoding utf8
}

$Content = Get-Content -Path $ChangelogPath
$NewContent = @()
$FoundUnreleased = $false
$FoundSection = $false
$SectionHeader = "### $Section"

foreach ($Line in $Content) {
    $NewContent += $Line
    
    if ($Line -match "## \[Unreleased\]") {
        $FoundUnreleased = $true
    }

    if ($FoundUnreleased -and $Line -match "^$SectionHeader") {
        $NewContent += $Entry
        $FoundSection = $true
    }
}

# If section wasn't found under Unreleased, add it
if ($FoundUnreleased -and -not $FoundSection) {
    # This is a bit simplified, ideally we'd insert in the right order
    $FinalContent = @()
    $Inserted = $false
    foreach ($Line in $NewContent) {
        $FinalContent += $Line
        if (-not $Inserted -and $Line -match "## \[Unreleased\]") {
            $FinalContent += ""
            $FinalContent += "$SectionHeader"
            $FinalContent += $Entry
            $Inserted = $true
        }
    }
    $NewContent = $FinalContent
}

Set-Content -Path $ChangelogPath -Value $NewContent -Encoding utf8
Write-Host "Updated $ChangelogPath with: $Entry under $Section"
