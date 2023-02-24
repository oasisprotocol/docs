# Upgrading Key Managers

This guide will describe how to upgrade a key manager node.

## About the Upgrade

Every key manager node contains all the keys used by confidential ParaTimes 
inside its TEE-encrypted state. The key material is sealed and can only be 
decrypted by exactly the same TEE enclave running on the exactly same CPU. This 
means that newer key manager ParaTimes can not read the key material and that 
key material can not be restored on another machine. 

:::danger

During a key manager node upgrade it is therefore essential that the key 
material is not lost, not even due to an operational error or even a 
catastrophically failed upgrade.

:::

## Safe Upgrade Procedure

A key manager node's upgrade procedure differs from other Oasis nodes upgrades 
because the upgraded node cannot unseal/decrypt the old key manager's state.

To upgrade a key manager node, we need to delete the local state and let the 
key manager's state replicate itself from other nodes. Only one key manager 
runtime in the configuration file can be present at once. 

**In case you are running multiple key manager nodes always follow the safe 
upgrade procedure:**
1. Keep approximately one half of nodes running the old version.
2. Upgrade the other half.
3. Wait for the ParaTime upgrade epoch.
4. Verify that secrets have been replicated [as shown below].
5. **Verify again.**
6. Upgrade the rest of the nodes.

[as shown below]: #verifying-successful-replication

### Upgrade Nodes

To upgrade a key manager node, follow the next steps:
1. Stop the node.
2. Wipe its local state `worker-local-storage.badger.db`, e.g.:
```
rm -rf runtimes/4000000000000000000000000000000000000000000000004a1a53dff2ae482d/worker-local-storage.badger.db/
```
3. Upgrade the key manager runtime: 
    - get the new ORC file ([mainnet], [testnet]); 
    - update the configuration to replace the ORC file; and
    - restart the node.
4. Wait for the key material to get replicated from active nodes before 
continuing.
5. Verify that secrets have been replicated [as shown below].

[mainnet]: ../../mainnet/#key-manager
[testnet]: ../../testnet/#key-manager

### After the Upgrade

#### Verifying Successful Replication

After the upgrade epoch and when the key material is successfully replicated, 
the `control status` output should show `keymanager.status="ready"` and 
`registration.descriptor.runtimes.0.extra_info` should contain a hash of the 
key material state:
```
$ oasis_node oasis-node -a unix:/storage/node/internal.sock control status
...
  "registration": {
    "last_registration": "2023-02-06T08:40:30Z",
    "descriptor": {
...
      "runtimes": [
        {
          "id": "4000000000000000000000000000000000000000000000004a1a53dff2ae482d",
          "version": {
            "minor": 3,
            "patch": 3
          },
          "capabilities": {
            "tee": {
              "hardware": 1,
...
            }
          },
          "extra_info": "omlzaWduYXR1cmVYQG7nDuKTOUKAlJAfukdY6Xljox376lCLI0cIP0zPw2B8abJxa31j+NoQAWA0KZuHD41XPyICmjXDTpjDXukEEgVtaW5pdF9yZXNwb25zZaNoY2hlY2tzdW1YIEWZF5YaFQChstrZ9u1UdgyqZCagmNfghvyQna9WkmvyaWlzX3NlY3VyZfVvcG9saWN5X2NoZWNrc3VtWCCsrqRzYjx05t+KoCYz7wFSdKJ720g2LQBAsRKXmClMvw=="
        }
      ],
      "roles": "key-manager",
    }
  }
...
  "keymanager": {
    "status": "ready",
    "may_generate": false,
    "runtime_id": "4000000000000000000000000000000000000000000000004a1a53dff2ae482d",
    "client_runtimes": [
      "000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c",
      "0000000000000000000000000000000000000000000000000000000000000000"
    ],
    "access_list": [
...
    ],
    "private_peers": [
...
    ]
  }
```

## Troubleshooting

If you forgot to wipe the key manager's state when upgrading, the upgraded Key 
Manager will be unable to unseal the old state and will abort:
```
{"level":"warn","module":"runtime","msg":"thread 'main' panicked at 'runtime execution failed: Enclave panicked.', runtime-loader/bin/main.rs:57:10","runtime_id":"4000000000000000000000000000000000000000000000004a1a53dff2ae482d","runtime_name":"keymanager","ts":"2022-11-11T13:38:18.805919693Z"}
```
