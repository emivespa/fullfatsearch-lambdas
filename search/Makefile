# .env: https://www.robg3d.com/2020/05/2288/
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

default: ;

.PHONY: deploy
deploy: template.yaml
	sam deploy \
		--capabilities CAPABILITY_IAM \
		--parameter-overrides \
			Endpoint=$(ENDPOINT) \
			Index=$(INDEX) \
			Password=$(PASSWORD) \
			User=$(USER) \
		--resolve-s3 \
		--stack-name $(STACK) \
		--template-file template.yaml \
		--

.PHONY: start-api
start-api: template.yaml
	sam local start-api \
		--debug \
		--parameter-overrides \
			Endpoint=$(ENDPOINT) \
			Index=$(INDEX) \
			Password=$(PASSWORD) \
			User=$(USER) \
		--template-file template.yaml \
		--

.PHONY: invoke
invoke: event.json template.yaml
	sam local invoke 'Search' \
		--debug \
		-e event.json \
		--parameter-overrides \
			Endpoint=$(ENDPOINT) \
			Index=$(INDEX) \
			Password=$(PASSWORD) \
			User=$(USER) \
		--template-file template.yaml \
		--
