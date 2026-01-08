# Branch protection: Require 'Scan ad usage' check on master

## Summary
Enforce branch protection on `master` to require the `Scan ad usage` workflow to pass before merging. This prevents accidental re-introduction of global AdSense script or other risky ad placements by ensuring the `scan-ads` script runs on all PRs and the check must pass.

## Why
- Prevents regression that could reintroduce policy-violating ad placements.
- Ensures PR authors fix ad-related issues before merging.

## Recommendation
1. In GitHub repository settings -> Branches -> Branch protection rules:
   - Branch: `master`
   - Require status checks to pass before merging: **Enable**
   - Select the status check: `Scan ad usage` (GitHub Actions workflow named `scan-ads.yml`)
   - Optionally check: "Require branches to be up to date before merging"
   - Save changes

## Follow-ups
- Add a README badge showing the workflow status.
- Add PR comment step that posts the scan output on PR failures.

cc: @founoun2
