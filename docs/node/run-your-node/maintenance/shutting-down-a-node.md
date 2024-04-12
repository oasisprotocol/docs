# Shutting Down a Node

When a node registers for an epoch, it is committing to being available
to service requests for the entire epoch.  Due to this availability
commitment, validator and non-client paratime nodes must be shutdown
gracefully to avoid network disruption.

The graceful shutdown process involves the following steps:

1. Ensure your service manager (e.g. systemd) will not restart the node after
   exit. Otherwise the node may re-register on startup and you will need to wait
   another epoch for it to expire.
2. Halt the automatic re-registration.
3. Wait for the node's existing registration to expire.
4. Terminate the node binary.

To have the node gracefully shutdown, run:

```bash
# Issue a graceful shutdown request.
oasis-node control shutdown

# Issue a graceful shutdown request, and block until the node terminates.
# Note: This can take up to a full epoch to complete.
oasis-node control shutdown \
  --wait
````

:::caution

Failure to gracefully shutdown the node may result in the node being
frozen (and potentially stake being slashed) due to the node being
unavailable to service requests in an epoch that it is registered for.

:::
