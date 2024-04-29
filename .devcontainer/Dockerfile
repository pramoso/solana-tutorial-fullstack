FROM mcr.microsoft.com/devcontainers/rust:bookworm

# define arguments versions
ARG SOLANA_CLI="v1.18.11"
ARG ANCHOR_CLI="v0.30.0"
ARG NODE_VERSION="18.x"

# vscode as non-root user
# https://github.com/devcontainers/images/blob/main/src/rust/.devcontainer/devcontainer.json
ENV HOME="/home/vscode"

# install dependencies from package manager
RUN apt update && apt install -y libudev-dev

# install nodejs, npm & yarn
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION} | bash - && apt-get install -y nodejs
RUN npm install -g yarn

# install rust
# RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
# ENV PATH="${HOME}/.cargo/bin:$PATH"

# install solana tools
RUN sh -c "$(curl -sSfL https://release.solana.com/${SOLANA_CLI}/install)"
ENV PATH="${HOME}/.local/share/solana/install/active_release/bin:$PATH"

# install anchor
RUN cargo install --git https://github.com/coral-xyz/anchor --tag ${ANCHOR_CLI} anchor-cli --locked

# enable React Hot Reload in Container
ENV WATCHPACK_POLLING=true