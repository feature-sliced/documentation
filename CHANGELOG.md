# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2.0.0

> **Note**  
> This release note is retrospective, meaning that prior to this release, the Feature-Sliced Design project did not keep a changelog. Below is a summary of the most prominent recent changes, but there is no FSD v1. Prior to FSD, there has been a project called ["Feature Slices"](https://featureslices.dev/v1.0.html), and it is considered to be the v1 of FSD.

### Deprecated

- The **Processes** layer is now deprecated. If you're using this layer, consider moving the code to the **Features** layer, with the help of the **App** layer if you need to access pages.

### Added

- The docs are now available in the Uzbek language! The translation is a work in progress, so feel free to contribute (#597, #603, #605).
- Layers, slices, and segments now have strict definitions to avoid ambiguity (#547).
- We now have a multi-lingual Discord community! Feel free to join and ask questions in English, Spanish, German, Ukrainian, Russian, and Japanese.
- The Telegram community is now making use of forum topics to enable conversations in multiple languages: English, Spanish, Ukrainian, Russian, Japanese, Kazakh, Uzbek, and Serbian.

### Changed

- The documentation is now English-first. Other languages are, of course, still supported (#509).
- A new decomposition cheatsheet has been released (#627).
- The FAQ section has been updated, outdated questions have been removed (#628).
- The visual depiction of layers has been updated to reflect their folder-based nature (#583).
- The README has been refreshed, now it features official badges that you can use in your projects (#569).
- The pages about naming and knowledge types have been rewritten for clarity (#550, #551).
- The documentation has been thoroughly reorganised. The old URLs will redirect to the right places (#471, #531).
- The first page of the docs is now a helpful index with a prominent first step (#525).
- The overview page has been rewritten to be more concise and informative (#512, #515, #516).
- FSD has updated its branding, and there are now guidelines to the brand usage. The standard spelling of the name is now "Feature-Sliced Design" (#496, #499, #500, #465).
