FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    curl \
    wget \
    net-tools \
    iputils-ping \
    && rm -rf /var/lib/apt/lists/*
