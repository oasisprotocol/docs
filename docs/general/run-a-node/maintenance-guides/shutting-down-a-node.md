# Shutting Down a Node

When a node registers for an epoch, it is committing to being available
to service requests for the entire epoch.  Due to this availability
commitment, validator and non-client paratime nodes must be shutdown
gracefully to avoid network disruption.

The graceful shutdown process involves the following steps:

1. Halt the automatic re-registration.
2. Wait for the node's existing registration to expire.
3. Terminate the node binary.

To have the node gracefully shutdown, run:

```bash
# Request a graceful shutdown, and exit as soon as the request is issued.
oasis-node control shutdown

# Request a graceful shutdown, and wait for the node to terminate.
# Note: This can take up to a full epoch to complete.
oasis-node control shutdown \
  --wait
````

:::caution

Failure to gracefully shutdown the node may result in the node being
frozen (and potentially stake being slashed) due to the node being
unavailable to service requests in an epoch that it is registered.

:::
