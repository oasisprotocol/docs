# Address book

Source: https://docs.oasis.io/build/tools/cli/addressbook

If you repeatedly transfer tokens to the same recipients or if you just want to
store an arbitrary address for future use, you can use the `addressbook`
command to **name the address and store it in your address book**. Entries
in your address book are behaving similarly to the
[accounts stored in your wallet][wallet], for example when checking the balance
of the account or sending tokens to. Of course, you cannot sign any
transactions with the address stored in your address book since you do not
possess the private key of that account. Both the Oasis native and the
Ethereum-compatible addresses can be stored.

**Info**:

The name of the address book entry may not clash with any of the account names
in your wallet. The Oasis CLI will prevent you from doing so.

[wallet]: https://docs.oasis.io/build/tools/cli/wallet.md

## Add a New Entry

Use `addressbook add <name> <address>` to name the address and store it in your
address book.

```shell
oasis addressbook add mike oasis1qrtrpg56l6y2cfudwtgfuxmq5e5cyhffcsfpdqvw
```

```shell
oasis addressbook add meghan 0xBe8B38ED9b0794e7ab9EbEfC1e710b4F4EC6F6C1
```

Then, you can for example use the entry name in you address book to send the
tokens to. In this case, we're sending `2.5 TEST` to `meghan` on Sapphire
Testnet:

```shell
oasis account transfer 2.5 meghan
```

```
You are about to sign the following transaction:
Format: plain
Method: accounts.Transfer
Body:
  To: meghan (oasis1qrjzcve7y6qp3nqs3n7ghavw68vkdh3epcv64ega)
  Amount: 2.5 ROSE
Authorized signer(s):
  1. ArEjDxsPfDvfeLlity4mjGzy8E/nI4umiC8vYQh+eh/c (secp256k1eth)
     Nonce: 0
Fee:
  Amount: 0.0002779 ROSE
  Gas limit: 2779
  (gas price: 0.0000001 ROSE per gas unit)

Network:  mainnet
ParaTime: emerald
Account:  eugene
(In case you are using a hardware-based signer you may need to confirm on device.)
```

## List Entries

You can list all entries in your address book by invoking `addressbook list`.

```shell
oasis addressbook list
```

```
NAME  	ADDRESS                                        
meghan	0xBe8B38ED9b0794e7ab9EbEfC1e710b4F4EC6F6C1    	
mike  	oasis1qrtrpg56l6y2cfudwtgfuxmq5e5cyhffcsfpdqvw	
```

## Show Entry Details

You can check the details such as the native Oasis address of the Ethereum
account or simply check, if an entry exists in the address book, by running
`addressbook show <name>`:

```shell
oasis addressbook show meghan
```

```
Name:             meghan
Ethereum address: 0xBe8B38ED9b0794e7ab9EbEfC1e710b4F4EC6F6C1
Native address:   oasis1qrjzcve7y6qp3nqs3n7ghavw68vkdh3epcv64ega
```

```shell
oasis addressbook show mike
```

```
Name:             mike
Native address:   oasis1qrtrpg56l6y2cfudwtgfuxmq5e5cyhffcsfpdqvw
```

## Rename an Entry

You can always rename the entry in your address book by using
`addressbook rename <old_name> <new_name>`:

```shell
oasis addressbook list
```

```
NAME  	ADDRESS                                        
meghan	0xBe8B38ED9b0794e7ab9EbEfC1e710b4F4EC6F6C1    	
mike  	oasis1qrtrpg56l6y2cfudwtgfuxmq5e5cyhffcsfpdqvw	
```

```shell
oasis addressbook rename mike mark
```

```shell
oasis addressbook list
```

```
NAME  	ADDRESS                                        
mark  	oasis1qrtrpg56l6y2cfudwtgfuxmq5e5cyhffcsfpdqvw	
meghan	0xBe8B38ED9b0794e7ab9EbEfC1e710b4F4EC6F6C1    	
```

## Remove an Entry

To delete an entry from your address book invoke
`addressbook remove <name>`.

```shell
oasis addressbook list
```

```
NAME  	ADDRESS                                        
meghan	0xBe8B38ED9b0794e7ab9EbEfC1e710b4F4EC6F6C1    	
mike  	oasis1qrtrpg56l6y2cfudwtgfuxmq5e5cyhffcsfpdqvw	
```

```shell
oasis addressbook remove mike
```

```shell
oasis addressbook list
```

```
NAME  	ADDRESS                                    
meghan	0xBe8B38ED9b0794e7ab9EbEfC1e710b4F4EC6F6C1	
```

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
