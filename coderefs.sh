#!/bin/sh

if [[ -z "${IMAGE_NAME}" ]]; then
    echo "IMAGE_NAME environment variable not specified, defaulting to name 'launchdarkly/ld-find-code-refs'."
fi
if [[ -z "${IMAGE_VERSION}" ]]; then
    echo "IMAGE_NAME environment variable not specified, defaulting to tag 'latest'."
fi

if [[ -z "${LD_ACCESS_TOKEN}" ]]; then
    echo "LD_ACCESS_TOKEN environment variable must be set to run this script."
else
    IMAGE=${IMAGE_NAME:-launchdarkly/ld-find-code-refs}:${IMAGE_VERSION:-latest}
    docker pull $IMAGE
    docker run -v $(pwd):/repo -w /repo -e LD_ACCESS_TOKEN $IMAGE --dir=/repo --dryRun --outDir=/repo
fi