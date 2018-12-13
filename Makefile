#
#  Copyright 2018 Nalej
# 
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
# 
#      http://www.apache.org/licenses/LICENSE-2.0
# 
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
# 

# Name of the target applications to be built
APPS=web

# Target directory to store binaries and results
TARGET=bin

# Go parameters
NGCMD=ng
NGCLEAN=$(NGCMD) clean
NGTEST=$(NGCMD) test
NGE2E=$(NGCMD) e2e

# Docker configuration
AZURE_CR=nalejregistry
DOCKER_REGISTRY=$(AZURE_CR).azurecr.io
DOCKER_REPO=nalej
VERSION=$(shell cat .version)

# Use ldflags to pass commit and branch information
# TODO: Integrate this into the compilation process
# Build information
COMMIT=$(shell git rev-parse HEAD)

COVERAGE_FILE=$(TARGET)/coverage.out

.PHONY: all
all: dep build test yaml image

.PHONY: dep
dep:
	@echo ">>> Updating dependencies..."
	npm install

test-all: test test-race test-coverage

.PHONY: test test-e2e
test:
	@echo ">>> Launching tests..."
	$(NGTEST) --watch=false

test-e2e:
	@echo ">>> Launching End-to-end tests..."
	$(NGE2E)

.PHONY: clean
clean:
	@echo ">>> Cleaning project..."
	$(NGCLEAN)
	rm -rf $(TARGET)

.PHONY: dev
dev:
	@echo ">>> Serving project..."
	ng serve -o

.PHONY: dep build-all build build-local
build-all: dep format build
build: dep local

# Local compilation
local:
	@echo ">>> Building..."
	npm build

yaml:
	@echo ">>> Creating K8S files..."
	for app in $(APPS); do \
		if [ -d components/"$$app"/appcluster ]; then \
			mkdir -p $(TARGET)/yaml/appcluster ; \
			cp components/"$$app"/appcluster/*.yaml $(TARGET)/yaml/appcluster/. ; \
			cd $(TARGET)/yaml/appcluster && find . -type f -name '*.yaml' | xargs sed -i '' 's/VERSION/$(VERSION)/g' && cd - ; \
		fi ; \
		if [ -d components/"$$app"/mngtcluster ]; then \
			mkdir -p $(TARGET)/yaml/mngtcluster ; \
			cp components/"$$app"/mngtcluster/*.yaml $(TARGET)/yaml/mngtcluster/. ; \
			cd $(TARGET)/yaml/mngtcluster && find . -type f -name '*.yaml' | xargs sed -i '' 's/VERSION/$(VERSION)/g' && cd - ; \
		fi ; \
	done

# Package all images and components
.PHONY: image create-image
image: create-image

create-image:
	@echo ">>> Creating images..."
	for app in $(APPS); do \
        echo Create image of app $$app ; \
        if [ -f components/"$$app"/Dockerfile ]; then \
            docker build --no-cache -t $(DOCKER_REGISTRY)/$(DOCKER_REPO)/"$$app":$(VERSION) -f components/"$$app"/Dockerfile . ; \
        else  \
            echo $$app has no Dockerfile ; \
        fi ; \
    done

# Publish the image
.PHONY: publish az-login az-logout publish-image
publish: image az-login publish-image az-logout

az-login:
	@echo ">>> Logging in Azure and Azure Container Registry ..."
	az login
	az acr login --name $(AZURE_CR)

az-logout:
	az logout

publish-image:
	@echo ">>> Publishing images into Azure Container Registry ..."
	for app in $(APPS); do \
		if [ -f components/"$$app"/Dockerfile ]; then \
			docker push $(DOCKER_REGISTRY)/$(DOCKER_REPO)/"$$app":$(VERSION) ; \
		fi ; \
    done
