# Shutting Down a Node

Source: https://docs.oasis.io/node/run-your-node/maintenance/shutting-down-a-node

Depending on the role (e.g. validator), a node may periodically register itself
to the consensus registry, committing itself to serve requests until the
expiration epoch. Due to this availability commitment, nodes must be shutdown
gracefully to avoid network disruption.

To have the node gracefully shutdown:

1. Ensure your service manager (e.g. systemd) will not restart the node after
   exit. Otherwise the node may re-register on startup and you will need to wait
   again.
2. Run one of the commands below:

```bash
# Issue a graceful shutdown request.
oasis-node control shutdown

# Issue a graceful shutdown request, and block until the node terminates.
# Note: This can take up to 3 full epochs to complete, because the node
# registers each epoch for the next 2 epochs (inclusive).
oasis-node control shutdown \
  --wait
```

Internally, the command will halt the automatic re-registration, wait for the
node's existing registration to expire and terminate the node binary. If the
node is not registered (e.g. non-validator or paratime client node) this command
will immediately terminate the node binary.

**Caution**:

Failure to gracefully shutdown the node may result in the node being
frozen (and potentially stake being slashed) due to the node being
unavailable to service requests in an epoch that it is registered for.

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
