# Hardware Recommendations

_The hardware configurations listed on this page are recommended minimum configurations. It might be possible to configure a system with less resources, but you run the risk of being underprovisioned and thereby prone to loss of stake._

## Suggested Minimum Configurations <a id="suggested-minimum-configurations"></a>

As noted in the [Architecture Overview](network-architecture-overview.md), the Oasis Network is composed of multiple classes of Nodes that participate in different committees. The majority of committees have common system configurations for the participant Nodes. We suggest the following minimum recommendations:

* 2.0 GHz x86-64
  * Must have AES-NI support
* 2 GB ECC RAM
* 500GB High Speed Storage

### HSMs <a id="hsms"></a>

It is critical that the Node Keys used to sign actions taken by Nodes are protected from loss. The economic model has yet to be completed, but it is expected that slashing from double signing will incur a heavy penalty. The HSM needs to support the Ed25519 signing scheme.

