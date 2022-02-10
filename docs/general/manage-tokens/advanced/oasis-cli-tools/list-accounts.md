# List Accounts

:::info

This example assumes you have read and followed the instructions in the [Prerequisites](prerequisites) and [Setup](setup) sections.

:::

To list all staking accounts with positive balance, run:

```bash
oasis-node stake list -a $ADDR
```

This will list all accounts' addresses, e.g.:

```
oasis1qqqfalz4xars9nxn0mjy8fcf9quqg8ml0szm5ped
oasis1qqqd4wrmk8z9p3hz0vyc6zy3khx3gqnckywyg2s5
oasis1qqqul8678xs9tnj74x54k8ch2qdh7jveeswqf67j
oasis1qqzrcyed78mkxmt9qpv3pemsugknnhvnpv8v5vc3
oasis1qqz0qcmy932p69493qdkszcf9emgl55azys3xr8f
oasis1qq95xthkg20ra6ue8zyngqkkm92xqkvrms88axkj
oasis1qq9meupznk90d4lgluvcaqa27ggs55dscc6msc33
oasis1qq9acq6v5knfmatc9fvuwyzlexs0f7j3uvarusu6
oasis1qqxqlpfslwuuh5342qnstymyutancj7csucxv2ec
oasis1qqxmp9lggptm0pt23za7g5cfg2hzspezcumw7c3j
oasis1qq89qxh538sunk6p2fca487pfsy0ncxk9q4xf2un
oasis1qq8hgj2yzssawtpfqr8utj6d57k9zvx3wc989kqm
oasis1qq8atykwecy3p5rnspkweapzz847exaqwyv80wgx
oasis1qqgv5rxl4w27l89rf4j5dv8392kh42wt35yn0as6
oasis1qqg0h3mt7klha4w2kxjvsktv5ke6suuwpg8rvpdh
oasis1qqf3ctyg49tnwclksxun3dzhrv4zuww7hu7w3cul
oasis1qqfasfrrx2tae50kcy8mcclhp0kqymswsqnqytyg
oasis1qq2rlaz3yjfk8gtdhnrfkrz5rrxjnnrzeq7mst0r

... output trimmed ...
```

For more information on account's address format, see the [Terminology](../../terminology#address) doc.
