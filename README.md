# Nalej UI

![Nalej UI](../web/src/assets/images/logo-inverted.png)

<p align="center">
  <em> Nalej web UI is the friendly layer that allows the user to interact with the Nalej platform in a visual way.  The user can easily identify application or resources entities and their relationships in addition to managing users.
  <br>
  <br>
  Develop Anything. Deploy Anywhere.
</em>
</p>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Apache](https://img.shields.io/badge/license-Apache-green.svg)](http://www.apache.org/licenses/)

The front end for **NALEJ**

[![Deploy](https://img.shields.io/badge/deploy-for--nalej-blueviolet?logo=data:assets/../../../../src/assets/images/Logo-black.svg;base64;logoColor=white;logoWidth=40&style=for-the-badge)](https://nalej.com/)

## Table of contents

- [Nalej UI](#nalej-ui)
  - [Table of contents](#table-of-contents)
  - [Overall features](#overall-features)
  - [Getting Started](#getting-started)
    - [Requirements](#requirements)
    - [Installation](#installation)
    - [Development server](#development-server)
    - [Code scaffolding](#code-scaffolding)
    - [Running unit tests](#running-unit-tests)
    - [Documentation](#documentation)
    - [Further help](#further-help)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## Overall features

Brand new UI Frontend for Nalej.

- Sidebar with navigation
  - Edit profile
  - Organization
  - Infrastructure
  - Resources
  - Devices
  - Applications
  - Logout
- Organizations view
  - Top indicators with organization info
  - Members user list with action buttons
  - Subscription plan
- Infrastructure view
  - Left indicators
    - Vertical aggregated capabilities summary
  - Right indicators
    - Static quick filters by inventory item type
    - Inventory list with specific type actions menu
    - ECs/Asset and devices modal windows navigation
- Resources view
  - Left indicators
    - Summary info
    - Cluster-instances list
  - Right indicators
    - Clusters-instances graph based on [NGX-Graph](https://github.com/swimlane/ngx-graph)
- Clusters view
  - Top indicators
    - Cluster status info
    - Summary info
  - Breadcrumbs
  - Nodes list
- Devices view
  - Top indicators
    - Summary info
    - Devices status timeline
  - Bottom indicators
    - Add group button
    - Devices list base on [NGX-Bootstrap](https://valor-software.com/ngx-bootstrap/#/accordion)
- Applications view
  - Left indicators
    - Summary info
    - App instances and registered list
  - Right indicators
    - Register an app
    - Deploy new app
    - Manage connections button
    - Quick filters
    - Cluster-instances-registered graph based on [NGX-Graph](https://github.com/swimlane/ngx-graph)
- Instances and registered view
  - Breadcrumbs
  - Left indicators
    - Instance/Registered info card
  - Right indicators
    - Services graph
    - Services info tables

To see older logs check [CHANGELOG](CHANGELOG.md) file

Tested and supported resolutions in pixels:

- 1280 x 720
- 1280 x 800
- 1366 x 768
- 1440 x 900
- 1613 x 917
- 1613 x 1027
- 1680 x 1027
- 1920 x 1080
- 1920 x 1200
- 2560 x 1440
- 2560 x 1800

## Getting Started

### Requirements

- Node Package Manager ([NPM](https://www.npmjs.com/))
- Angular Command Line ([Angular-CLI](https://cli.angular.io/))

### Installation

- `Clone the repository`
- `Change to project directory`
- `npm install`

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Documentation

Compodoc is the integrated library that automates the documentation generation. To update the documentation just run `npm run compodoc` and the updated version will be available to serve it in `documentation` folder ([http-server](https://www.npmjs.com/package/http-server) could be used for this purpose).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Contributing

Please read [contributing.md](contributing.md) for details on our code of conduct, and the process for submitting pull requests to us.
​

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

See also the list of [contributors](https://github.com/nalej/grpc-utils/contributors) who participated in this project.
​

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.
