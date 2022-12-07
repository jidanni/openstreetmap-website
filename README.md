# "The Rails Port"

[![Lint](https://github.com/openstreetmap/openstreetmap-website/workflows/Lint/badge.svg?branch=master&event=push)](https://github.com/openstreetmap/openstreetmap-website/actions?query=workflow%3ALint%20branch%3Amaster%20event%3Apush)
[![Tests](https://github.com/openstreetmap/openstreetmap-website/workflows/Tests/badge.svg?branch=master&event=push)](https://github.com/openstreetmap/openstreetmap-website/actions?query=workflow%3ATests%20branch%3Amaster%20event%3Apush)
[![Coverage Status](https://coveralls.io/repos/openstreetmap/openstreetmap-website/badge.svg?branch=master)](https://coveralls.io/r/openstreetmap/openstreetmap-website?branch=master)

This is The Rails Port, the [Ruby on Rails](http://rubyonrails.org/)
application that powers the [OpenStreetMap](https://www.openstreetmap.org) website and API.
The software is also known as "openstreetmap-website".

This repository consists of:

* The web site, including user accounts, diary entries, user-to-user messaging.
* The XML-based editing [API](https://wiki.openstreetmap.org/wiki/API_v0.6).
* The integrated version of the [iD](https://wiki.openstreetmap.org/wiki/ID) editors.
* The Browse pages - a web front-end to the OpenStreetMap data.
* The GPX uploads, browsing and API.

A fully-functional Rails Port installation depends on other services, including map tile
servers and geocoding services, that are provided by other software. The default installation
uses publicly-available services to help with development and testing.

# License

This software is licensed under the [GNU General Public License 2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt),
a copy of which can be found in the [LICENSE](LICENSE) file.

# Installation

The Rails Port is a Ruby on Rails application that uses PostgreSQL as its database, and has a large
number of dependencies for installation. For full details please see [INSTALL.md](INSTALL.md).

# Development

We're always keen to have more developers! Pull requests are very welcome.

* Bugs are recorded in the [issue tracker](https://github.com/openstreetmap/openstreetmap-website/issues).
* Translation is managed by [Translatewiki](https://translatewiki.net/wiki/Translating:OpenStreetMap).
* There is a [rails-dev@openstreetmap.org](https://lists.openstreetmap.org/listinfo/rails-dev) mailing list for development discussion.
* IRC - there is the #osm-dev channel on irc.oftc.net.

More details on contributing to the code are in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

# Maintainers

* Tom Hughes [@tomhughes](https://github.com/tomhughes/)
* Andy Allan [@gravitystorm](https://github.com/gravitystorm/)


# Docker for local development
For a standalone ohm-website development server, follow the steps below:
1. Create a ohm-docker.env from ohm-docker.env.example. If you are using the database as part the docker setup in this repo, leave the defaults.
2. Create a config/settings.local.yml from config/settings.yml
3. Run `docker compose up --build`. If you encounter any "SEGFAULT" 139 errors, you need to allocate more memory to Docker. Go to the GUI Docker Dashboard > Settings and allocate at least 6GB.
4. Visit http://localhost:3000
5. Create an account
6. Follow instructions in [CONFIGURE.md](https://github.com/openstreetmap/openstreetmap-website/blob/master/CONFIGURE.md) to activate the user, provide admin, and create OAuth2 tokens for iD and Website. Supply these keys in settings.local.yml. To activate user, you'll need to open a bash session in the container, so you can run the Rails commands in the OSM docs. Do that with:
`docker exec -it ohm-website-web-1 bash`
7. Restart containers
