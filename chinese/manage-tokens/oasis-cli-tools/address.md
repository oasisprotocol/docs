# 从实体ID获取账号地址

为了把实体 ID \(Base64 encoded\), 比如 `nyjbDRKAXgUkL6CYfJP0WVA0XbF0pAGuvObZNMufgfY=`, 转换为 [权益账号地址](../terminology.md#address), 运行以下命令：

```bash
oasis-node stake pubkey2address \
  --public_key nyjbDRKAXgUkL6CYfJP0WVA0XbF0pAGuvObZNMufgfY=
```

该命令会输出给定实体 ID 的权益账号地址：

```text
oasis1qrvsa8ukfw3p6kw2vcs0fk9t59mceqq7fyttwqgx
```

{% hint style="info" %}
可以在 `entity.json` 文件的 `id` 字段找到实体 ID。
{% endhint %}

