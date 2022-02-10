---
description: >-
  This page describes changes that should be made to the configuration of the
  system where you are running the Oasis Node instance.
---

# System Configuration

## File Descriptor Limit

Make sure that the user under which you are running your Oasis Node has a high-enough file descriptor limit as the databases can have many files open and running out of file descriptors can lead to the node stopping unexpectedly.

You can check the file descriptor limit by running the following as the same user that will run Oasis Node:

```bash
ulimit -n
```

If this number is lower than 102400 you should consider increasing it by updating your system configuration. You can configure _temporary_ limits by running:

```bash
ulimit -n 102400
```

Note that this limit only applies to any processes started from the same shell after the command was executed. If you want to make the change permanent, you have the following options.

### System-wide Resource Limits Configuration File

As `root`, create a file in `/etc/security/limits.d/99-oasis-node.conf` with content similar to the following example:

```bash
*        soft    nofile    102400
*        hard    nofile    1048576
```

You can replace `*` with the name of the user that is running the Oasis Node in case you only want to change the limits for that particular user.

:::caution

In order for the changes to take effect a system restart may be required.

:::

### Systemd Service Configuration

In case you are running your Oasis Node process via [systemd](https://systemd.io/), you can add the following directive under the `[Service]` section:

```text
LimitNOFILE=102400
```

### Docker

If you are running Oasis Node via [Docker](https://www.docker.com/) you can pass the following option to `docker run` in order to increase the limit to desired values:

```text
--ulimit nofile=102400:1048576
```

