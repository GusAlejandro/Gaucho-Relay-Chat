from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA
from Crypto.Hash import SHA256
import base64


class Security:

    def __init__(self):
        self.public_key, self.private_key = self.generate_rsa_keys()

    def generate_rsa_keys(self):
        # below is to generate but curreently using hardcoded ones
        # key_pair = RSA.generate(1024)
        # private_key = open("privatekey.pem","wb")
        # private_key.write(key_pair.exportKey())
        # private_key.close()
        #
        # public_key = open("public_key.pem", "wb")
        # public_key.write(key_pair.publickey().exportKey())
        # public_key.close()
        #
        # private_key = open("privatekey.pem", "rb")
        # private = RSA.importKey(private_key.read())
        # private_key.close()
        #
        # public_key = open("public_key.pem", "rb")
        # public = RSA.importKey(public_key.read())
        # public_key.close()

        private_key = open("privatekey.pem", "rb")
        private = RSA.importKey(private_key.read())
        private_key.close()

        public_key = open("public_key.pem", "rb")
        public = RSA.importKey(public_key.read())
        public_key.close()

        return public, private

    def RSA_encryption(self, clientPublicKey, message):
        # Uses client's public key to encrypt data
        client_pubkey = self.process_incoming_key(clientPublicKey)

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
        # TODO: See how the JS sends the key so we can see how to parse it down to format below, so currently have harcoded one
        # "-----BEGIN RSA PRIVATE KEY-----\n" + "MIICXAIBAAKBgQCa8LveGiyrEciL/CFMWzKpNceWpfU9V0rwAzsZuel3UdyvbEjFaC/cM9tDrx74BcxVP+GLLKD4COZufQ4qqBFu6K8ZhOyOOLDc/Ez+ZvK25N+z1iHHETwsVQdo8qtJCBsKNsAk0ZYppCw2uJsGxBW3C3awWKi9KFjpTaCOjccXhQIDAQABAoGAeDmWPUgoIvHgoKaam+okDGKbpYzPF7L1hfmr0VGOFDUkPcaTTQKEKKTgXcu0BxZQsFGqTFjr6qrVSySkansRUr3wmX1NgaP0v+tEg8LgqkxYCcguRBwcQ0KZ6eSvGNjKGiOyfCxcTnhRdy0DUW89knrQ8/NAnWm22xBqss/FDV0CQQDB7+cOy7Wp4igStQGv5rlY6K2spQb9t8VaIi3aawDyQbkW9BS3DDa4S7+0x501A98nEAa14R3B9h/eyWrvPcijAkEAzIYQEFVbattaX6/X/TmvKRKyK/a+4uQJ3+6L54fsqpUI00FX6T4LmwYwJvyVigU7+TmZMDh1hPtd9pdzjHRZtwJBAIigVC1OQgsOsqCLOEcNymHiegf4svYnczdOgPMxExeYSabsCXPzfNFVPBdF0XC564n/dlrH30j39ffj+hvVcPUCQGvyPjxAsPVfPP3P87HlZjvJcFyf6PQb49JbN2BGb3VBH91QWbPzWXDC/Vs2aT7lsFfEPMQkqHI9scRa/1OcfVUCQDuuIODkEEu9jW4InJ+2WUuEu3ug2U+K2MTSiyC/ek3B7sMSFiI6eI9JK+Eg//LpArApZJUCmNbU0ss6bq8I1pU=\n" +"-----END RSA PRIVATE KEY-----"
        key = "-----BEGIN PUBLIC KEY-----\n" + "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCv44ExFWGOVGROyYmesFceHZjXXF+unFuYyCJWR99Sg2rqgKnYbvxTS023aWhKRSQY2y0jrQ53XV9TiVWE2CNhXGdfgLnmK21DTJl7b+joMIHypLO2CjULDSiaMiSIDxQ1J8pJD4ZiHlN07TLjUv+lNHqWl9SsBcIEzPB5+No6JwIDAQAB\n" + "-----END PUBLIC KEY-----"
        key = key.encode('utf-8')
        key = RSA.importKey(key)
        return key

    def encrypt(self, message, key):
        key = int(key)
        message = message.lower()
        ciphertext = ""
        for char in message:
            x = ord(char)
            if x > 96 and x < 123:
                if x + key > 122:
                    remainder = (x + key) % 122
                    new_char = chr(remainder+96)
                    ciphertext = ciphertext + new_char
                else:
                    ciphertext = ciphertext + chr(x+key)
            else:
                ciphertext = ciphertext + char
        return ciphertext

    def decrypt(self, ciphertext, key):
        key = int(key)
        plaintext = ""
        for char in ciphertext:
            x = ord(char)
            if x > 96 and x < 123:
                left = x - key
                if left < 97:
                    remainder = 97 - left
                    new_char = chr(123-remainder)
                    plaintext = plaintext + new_char
                else:
                    plaintext = plaintext + chr(x-key)
            else:
                plaintext = plaintext + char
        return plaintext



    def hash(self):
        pass

    def check_message_integrity(self):
        pass


#
# sec = Security(2)
# x = sec.RSA_encryption("fa","5")
# print(x)


sec = Security()
x = sec.encrypt("the quick brown fox jumped over the fence !@!$$!@$?", "1")
print(x)
y = sec.decrypt(x, "1")
print(y)

#
# f = open("privatekey.pem" , "rb")
# key = RSA.importKey(f.read())
# cipher = PKCS1_OAEP.new(key, hashAlgo=SHA256)
# data = "D3IipDXyQesDmjrQJtUxcZwzFjLzMA0dy1Is8CXbfX0EZ4m6fQfB1HtGq6/DQBGMAT2rY4vkygk4L153pmQn1IG/kf5WiERdjcZvLA59psd3cXg6fwL+lOhn3ioDiGbDgg0dvF/0cFTSOjZBVSC/gnXp8qJ3Sifq2M8ckHkcsPQ="
# data = data.encode("utf-8")
# decr = cipher.decrypt(base64.b64decode(data))
# print(decr)
#
# #p = open("public_key.pem", "rb")
# cal = "-----BEGIN RSA PRIVATE KEY-----\n" + "MIICXAIBAAKBgQCa8LveGiyrEciL/CFMWzKpNceWpfU9V0rwAzsZuel3UdyvbEjFaC/cM9tDrx74BcxVP+GLLKD4COZufQ4qqBFu6K8ZhOyOOLDc/Ez+ZvK25N+z1iHHETwsVQdo8qtJCBsKNsAk0ZYppCw2uJsGxBW3C3awWKi9KFjpTaCOjccXhQIDAQABAoGAeDmWPUgoIvHgoKaam+okDGKbpYzPF7L1hfmr0VGOFDUkPcaTTQKEKKTgXcu0BxZQsFGqTFjr6qrVSySkansRUr3wmX1NgaP0v+tEg8LgqkxYCcguRBwcQ0KZ6eSvGNjKGiOyfCxcTnhRdy0DUW89knrQ8/NAnWm22xBqss/FDV0CQQDB7+cOy7Wp4igStQGv5rlY6K2spQb9t8VaIi3aawDyQbkW9BS3DDa4S7+0x501A98nEAa14R3B9h/eyWrvPcijAkEAzIYQEFVbattaX6/X/TmvKRKyK/a+4uQJ3+6L54fsqpUI00FX6T4LmwYwJvyVigU7+TmZMDh1hPtd9pdzjHRZtwJBAIigVC1OQgsOsqCLOEcNymHiegf4svYnczdOgPMxExeYSabsCXPzfNFVPBdF0XC564n/dlrH30j39ffj+hvVcPUCQGvyPjxAsPVfPP3P87HlZjvJcFyf6PQb49JbN2BGb3VBH91QWbPzWXDC/Vs2aT7lsFfEPMQkqHI9scRa/1OcfVUCQDuuIODkEEu9jW4InJ+2WUuEu3ug2U+K2MTSiyC/ek3B7sMSFiI6eI9JK+Eg//LpArApZJUCmNbU0ss6bq8I1pU=\n" +"-----END RSA PRIVATE KEY-----"
# cal = cal.encode('utf-8')
#
# ke = RSA.importKey(cal)
#
#
# cipher1 = PKCS1_OAEP.new(ke, hashAlgo=SHA256)
# data = "HELLO MY FREEND"
# data = data.encode("utf-8")
# encr = cipher1.encrypt(base64.b64encode(data))
# print(encr)
# encr = base64.b64encode(encr)
# print(encr)

