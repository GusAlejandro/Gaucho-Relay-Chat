from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA
from Crypto.Hash import SHA256
from random import randint
import base64


class Security:




    def __init__(self):
        self.public_key, self.private_key, self.client_public = self.generate_rsa_keys()
        self.general_symm_key = "5"
        self.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                    'u',
                    'v', 'w', 'x', 'y', 'z']


    def generate_rsa_keys(self):
        # below is to generate but curreently using hardcoded ones
        # key_pair = RSA.generate(1024)
        # private_key = open("clientprivatekey.pem","wb")
        # private_key.write(key_pair.exportKey())
        # private_key.close()
        #
        # public_key = open("clientpublic_key.pem", "wb")
        # public_key.write(key_pair.publickey().exportKey())
        # public_key.close()
        #
        # private_key = open("clientprivatekey.pem", "rb")
        # private = RSA.importKey(private_key.read())
        # private_key.close()
        #
        # public_key = open("clientpublic_key.pem", "rb")
        # public = RSA.importKey(public_key.read())
        # public_key.close()

        private_key = open("privatekey.pem", "rb")
        private = RSA.importKey(private_key.read())
        private_key.close()

        public_key = open("public_key.pem", "rb")
        public = RSA.importKey(public_key.read())
        public_key.close()

        f_client = open("clientpublic_key.pem", "rb")
        client = RSA.importKey(f_client.read())
        f_client.close()

        return public, private, client

    def RSA_encryption(self, clientPublicKey, message):
        # Uses client's public key to encrypt data
        client_pubkey = clientPublicKey

        encryptor = PKCS1_OAEP.new(client_pubkey, hashAlgo=SHA256)
        message = message.encode('utf-8')
        ciphertext = encryptor.encrypt(base64.b64encode(message))
        ciphertext = base64.b64encode(ciphertext)
        return ciphertext

    def RSA_decryption(self, message):
        # Uses own private key to decrypt message
        message = message.encode("utf-8")
        decryptor = PKCS1_OAEP.new(self.private_key, hashAlgo=SHA256)
        plaintext = decryptor.decrypt(base64.b64decode(message))
        return plaintext

    def process_incoming_key(self, raw_key):
        key = "-----BEGIN PUBLIC KEY-----\n" + "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCv44ExFWGOVGROyYmesFceHZjXXF+unFuYyCJWR99Sg2rqgKnYbvxTS023aWhKRSQY2y0jrQ53XV9TiVWE2CNhXGdfgLnmK21DTJl7b+joMIHypLO2CjULDSiaMiSIDxQ1J8pJD4ZiHlN07TLjUv+lNHqWl9SsBcIEzPB5+No6JwIDAQAB\n" + "-----END PUBLIC KEY-----"
        key = key.encode('utf-8')
        key = RSA.importKey(key)
        return key

    def encrypt(self, message, key):
        key = int(key)
        message = message.lower()
        ciphertext = ""
        for char in message:
            if char in self.alphabet:
                x = self.alphabet.index(char)
                newIndex = (x+key)%len(self.alphabet)
                ciphertext = ciphertext + self.alphabet[newIndex]
            else:
                ciphertext = ciphertext + char
        return ciphertext

    def decrypt(self, ciphertext, key):
        key = int(key)
        plaintext = ""
        for char in ciphertext:
            if char in self.alphabet:
                x = self.alphabet.index(char)
                newIndex = x - key
                plaintext = plaintext + self.alphabet[newIndex]
            else:
                plaintext = plaintext + char
        return plaintext

    def hash(self, message):
        encoded_message = message.encode('utf-8')
        hash = SHA256.new(encoded_message)
        return hash.hexdigest()

    def is_message_authentic(self, theHash, plaintext_message):
        calculated_hash = self.hash(plaintext_message)
        return calculated_hash == theHash

    @staticmethod
    def generate_symmetric_key():
        symmetric_key = str(randint(1,25))
        return symmetric_key

    def get_public_key(self):
        return self.public_key

    def get_private_key(self):
        return self.private_key

    def get_general_symmetric_key(self):
        return self.general_symm_key

    def get_client_public_key(self):
        return self.client_public

    def message_outbound(self, raw_message, symm_key):
        # takes in raw_message
        raw_message = raw_message.lower()
        message_hash = self.hash(raw_message)
        message_and_hash = message_hash + raw_message

        return self.encrypt(message_and_hash, symm_key)


    def message_inbound(self, encrypted_message, symm_key):
        # takes in encrypted
        print("ENCR MESS " + encrypted_message)
        hash_and_message = self.decrypt(encrypted_message, symm_key)
        the_hash = hash_and_message[0:64]
        message = hash_and_message[64:]
        print("tje hash " + the_hash)
        print("the mwsaage " + message)
        result = self.is_message_authentic(the_hash, message)
        if result:
            # is valid so we can take message and run through the outbound func
            return message
        else:
            return "Message has been corrupted"
#
# sec = Security()
# x = sec.RSA_encryption(sec.client_public, "MAKE SDFAF")
# print(x)
#
# sec = Security()
# # x = sec.encrypt("the quick brown fox jumped over the fence !@!$$!@$?", "13")
# # print(x)
# y = sec.decrypt("ymj vznhp gwtbs ktc ozruji tajw ymj qfed itl", "5")
# print(y)


# sec = Security()
# x = sec.hash("dtz fwj stb qtllji ns fx lzxyfat")
# print(x)

# sec = Security()
# x = sec.message_inbound("1z8y193257b34y76zz4481322b08bz069z66c10x38b183a036824y99yaza61xxjxhb xjbofzx dobxq xdxfk","23")
# print(x)

