# Test

Source: https://docs.oasis.io/build/rofl/workflow/test

## SGX ROFL

Apps running in SGX ROFL are fully supported by the [`sapphire-localnet`] Docker
image. Simply bind-mount your app folder and any ORC bundles will automatically
be registered and executed on startup:

```shell
docker run -it -p8544-8548:8544-8548 -v .:/rofls ghcr.io/oasisprotocol/sapphire-localnet
```

[`sapphire-localnet`]: https://docs.oasis.io/build/tools/localnet.md

## TDX ROFL raw

Testing ROFL TDX raw instances locally is currently not support. You will need
to deploy them on Sapphire Testnet.

## TDX ROFL containers

The behavior of containers inside ROFL should be the same as running the
`podman-compose` locally and exporting secrets:

```shell
export SECRET=some_secret
podman-compose up --build
```

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
