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

## Restarting a Shutdown Node

To prevent restart loops causes by service managers, and to ensure
that the node will shutdown when requested, the node will persist
a flag indicating that a shutdown is in progress.

Oasis nodes prior to 22.0.3 will require that once a node is gracefully
shutdown, the next time it is launched, the
`--worker.registration.force_register` command line argument or equivalent
config option be passed to the node the next time the node is started,
or the node will shutdown immediately.

This behavior has been changed in newer revisions of the software such
that the flag should no longer be required.
