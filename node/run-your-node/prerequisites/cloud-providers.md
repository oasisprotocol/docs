# Cloud Providers

Source: https://docs.oasis.io/node/run-your-node/prerequisites/cloud-providers

Before committing to a service be sure to verify the processor compatibility and
enquire with the provider about the status of Intel SGX support. Intel maintains
a comprehensive list of processors that support Intel SGX:

* <https://www.intel.com/content/www/us/en/architecture-and-technology/software-guard-extensions-processors.html>

## Possible Limitations

While many bare-metal or dedicated server providers use Intel processors that
support SGX, there are potential limitations:

* **BIOS Configuration:** Some providers may not allow customers to access or
  modify BIOS settings, which may be necessary to correctly configure Intel
  SGX.
* **Outdated Firmware:** SGX requires up-to-date firmware. Some providers may
  not maintain their systems with the latest firmware updates, preventing SGX from functioning correctly.
* **Lack of SGX-specific Offerings:** Many providers may not advertise or
  specifically offer SGX-enabled servers, making it difficult for customers to
  know if the feature is available.
* **Limited Support:** Even if SGX is available, the provider's support team
  may not be familiar with SGX-specific issues or configurations.
* **Hardware Provisioning:** If you use keys (such as SGX sealing keys) that
  are bound to hardware to encrypt the data of an instance within an Intel SGX
  enclave, the encrypted data cannot be decrypted after the host of the
  instance is changed.

## Known Providers

| Provider                                      | Product                                                                                                                  | Documentation                                                                                                                                       | Last Updated |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| [Alibaba Cloud](https://www.alibabacloud.com) | [(ECS) Bare Metal Instances](https://www.alibabacloud.com/en/product/ebm)                                                | [Build an SGX confidential computing environment](https://www.alibabacloud.com/help/en/ecs/user-guide/build-an-sgx-encrypted-computing-environment) | 2024-09-25   |
| [Azure](https://azure.microsoft.com/)         | [Some Dedicated Host SKUs](https://learn.microsoft.com/en-us/azure/virtual-machines/dedicated-host-general-purpose-skus) | [Solutions on Azure for Intel SGX](https://learn.microsoft.com/en-us/azure/confidential-computing/virtual-machine-solutions-sgx)                    | 2024-09-25   |
| [Gcore](https://gcore.com)                    | [Bare Metal](https://gcore.com/cloud/bare-metal-servers)                                                                 | [Computing with Intel SGX](https://gcore.com/cloud/intel-sgx)                                                                                       | 2024-09-25   |
| [IBM Cloud](https://cloud.ibm.com/)           | [Virtual Private Cloud (VPC)](https://www.ibm.com/cloud/vpc)                                                             | [Confidential computing with SGX for VPC](https://cloud.ibm.com/docs/vpc?topic=vpc-about-sgx-vpc).                                                  | 2024-09-25   |
| [OVH](https://www.ovhcloud.com/)              | [Bare Metal servers](https://www.ovhcloud.com/en/bare-metal/prices/?use_cases=confidential-computing)                    | [SGX for Confidential Computing](https://www.ovhcloud.com/en/bare-metal/intel-software-guard-extensions/)                                           | 2024-09-25   |
| [PhoenixNAP](https://phoenixnap.com/)         | [Bare Metal Cloud](https://phoenixnap.com/bare-metal-cloud)                                                              | [What is Intel SGX and What are the Benefits?](https://phoenixnap.com/kb/intel-sgx)                                                                 | 2024-09-25   |
| [Vultr](https://www.vultr.com/)               | [Bare Metal](https://www.vultr.com/products/bare-metal/)                                                                 | [Intel SGX development on Vultr](https://zenlot.medium.com/intel-sgx-development-on-vultr-30cdfd5c9754)                                             | 2024-09-25   |

If you are aware of more cloud or dedicated server providers that actively
support Intel SGX or Intel TDX, or have updated information about the providers
listed on this page, please [create an issue on Github] with the additional
details.

[create an issue on Github]: https://github.com/oasisprotocol/docs/issues/new

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
