/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Group } from '../../definitions/interfaces/group';
import { RoleOptions } from 'src/app/definitions/enums/role-options.enum';
import { UserChanges } from 'src/app/definitions/interfaces/user-changes';
import { UpdateUserRequest } from 'src/app/definitions/interfaces/update-user-request';

export const mockJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    // tslint:disable-next-line:max-line-length
    '.eyJhY2Nlc3MiOlsiT1JHIl0sImV4cCI6MTU0MjI4Njg2MywiaWF0IjoxNTQyMjc2MDYzLCJpc3MiOiJhdXRoeCIsImp0aSI6IjI1OTA5ZDNkLTJlODMtNDlmMC04ZmQzLTFlYmZiNTYxMTNhMSIsIm5iZiI6IjE1NDIyNzYwNjMiLCJvcmdhbml6YXRpb25JRCI6IjdhZDFhN2E4LWU0YjEtNDc5OC05MDcxLWU0NTY5MDhmYWQxMyIsInJvbGUiOiJPd25lciIsInVzZXJJRCI6ImpvaG4uZG9lQG1haWwuY29tIn0' +
    '.MeCoZ_UdYiMlduG-ik63rHHqHztQrK7dgIEWceW0VRk';

/**
 * Mocked organization info
 */
export const mockOrganizationInfo = {
    name: 'Nike'
};

/**
 * Mocked users list
 */
export const mockUserList: UserChanges[] = [
    {
        name: 'Celia',
        email: 'toth.c@mail.com',
        role_name: RoleOptions.NalejAdmin,
        member_since: 1579603187615065686,
        role_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        last_name: 'Toth',
        title: 'Product owner',
        last_login: 1575457623642000000,
        phone: '+34 658658658',
    },
    {
        name: 'Sara',
        email: 'saradoe@mail.com',
        role_name: RoleOptions.NalejAdmin,
        photo_base64: 'data:image/gif;base64,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',
        member_since: 1579608567515341742,
        role_id: 'ae832b4a-a1ec-4244-8c5b-8c3f3a000d53',
        last_name: 'Doe',
        title: 'Product owner',
        last_login: 1575457623642000000,
        location: 'Madrid, Spain'
    },
    {
        name: 'Dave',
        email: 'davesmith@mail.com',
        role_name: RoleOptions.NalejAdmin,
        member_since: 1579603187615065686,
        role_id: 'ae832b4a-a1ec-4244-8c5b-8c3f3a000d53',
        last_name: 'Smith',
        title: 'Product owner',
        last_login: 1575457623642000000,
        phone: '+34 658658658',
        location: 'Madrid, Spain'
    },
    {
        name: 'John Doe',
        email: 'john.doe@mail.com',
        role_name: RoleOptions.NalejAdmin,
        photo_base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASoAAAEUCAYAAACcSnvyAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAyCDOwMnAzMCamFxc4BgQ4ANUwgCjUcG3a0DVQHBZF2TW/kk1mTtz+gtP6S/5KqT1JwdTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1NjE0DSfgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQizfg4HB+i4DA5M4QixJlYFhWzTQGy0IMdVMBgbeEwwMByYVJBYlwh3A+I2lOM3YCMLm3s7AwDrt///PQI+yazIw/L3+///v7f///13GwMB8C6j3GwDDsV/AJME+5AAAAFZlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA5KGAAcAAAASAAAARKACAAQAAAABAAABKqADAAQAAAABAAABFAAAAABBU0NJSQAAAFNjcmVlbnNob3R9BgTJAAAB1mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yOTg8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpVc2VyQ29tbWVudD5TY3JlZW5zaG90PC9leGlmOlVzZXJDb21tZW50PgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+Mjc2PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Clf3t8QAAC4/SURBVHgB7V0LnE7V+n5nmKEZ/ZNyvyaOS0QjUYgMSSi3IhIhd1KUEroQEZ0UchS5pXRCRZ3kklGKZA65X3O/5TJ+mYlhxv97Vucrze3be39r773W3u/7+zEz+1t7XZ611vOt9a53vW/Er7/+eoVYGAFGgBFQGIFIhevGVWMEGAFGQCDARMUDgRFgBJRHgIlK+S7iCjICjAATFY8BRoARUB4BJirlu4gryAgwArkZAkbAKgKXL1+mc+fOiX/nz5+n5ORkSklJoQsXLlBqaipdunSJkCY9PZ2uXLlCERERFBkZSblz56aoqCiKjo6mvHnzUkxMDMXGxlK+fPnouuuuE/+QhoURCCLAoyGIBP/MhADI5/Dhw3Ts2DE6fvw4nTx5kk6dOkVnz56lpKQkQUyZXpL0AMSVP39+uv766+nGG2+kQoUKUZEiRahYsWJUvHhxQWqSiuJsNEAggu2oNOglm6t46dJl2r//F9q3b5/4d+jQITp69KhYKdlctOXssfICaZUsWZLKli0r/pUpc1NgpcbfvZZBVfhFJiqFO8euqp04cYK2bdtG27dvpz179hCICVs03QXbRRBXuXLlqFKlSlS5cmUqXLiw7s3i+gcQYKLywTDAdm3jxo3i344dO+j06dM+aPUfTbzhhhsEaVWrVo2qV68utpG+abyHGspE5aHODDYlLS2NtmzZQuvXrxfkdOTIkeBHvv8J/RYIq2bNmlSlShXKlSuX7zHRAQAmKh16yUAdL168SBs2bKA1a9YIcsLpG0vOCOC0EaRVp04dqlGjBuXJkyfnF/hT1xBgonIN+vALxsrpp59+olWrVglyglkAizUEYCYB0mrQoAHdfvvtvNKyBqNtbzFR2QatfRnv3r2bVqxYIVZPMCFgkYsA7LmwyoqPj6fy5cvLzZxzs4QAE5Ul2Jx/KSU5hVZ+s5KWL19OBw4ccL4CPi2xdOnS1KhRI2p4T0OKiY3xKQruN5uJyv0+yLEGIKUvvviCvv32W2HxnWNi/tA2BK655hqqW7cuNWvWjEBeLM4iwETlLN6GS0vckEiLPl0kTu8Mv8QJHUEAp4WtWraiuBpxjpTHhbAdlVpjIOBrNWF1Ai1cuJAOHjyoVt24NpkQKFWqFLVp04burnd3YCZl+pgfSESAV1QSwbSaFS7tQjm+YMECgtU4i14IwPodhAXlOy5ds8hHgIlKPqamcly5ciXNnz9fXPg19SInVg4BXJxu164dNWzYULm66V4hJiqXenDdunU0Z84cYqtxlzrAxmJh/d6pUyeqVauWjaX4K2smKof7GzZQ06dPp507dzpcMhfnNAIVK1akrl27si2WBOCZqCSAaCSLM2fO0OzZsykhIcFIck7jIQTq169Pjz32GBUoUMBDrXK2KUxUNuMNRfmiRYvESR7fv7MZbIWzx73C1q1bU6tWrVjhbqGfmKgsgGb0Ffh7mjJlivCSafQdTudtBEqUKEF9+vQRrme83VK5rWOikounyA2+w6EoX7p0qQ25c5ZeQKBJkyZC4Q6XyyyhEWCiCo2RqRSJiYk0efJkgk6KhRHICQHorPr160e33XZbTsn4swACTFSShgH0TzNnzqRly5ZJypGz8QsCjRs3pi5duohoPH5ps9l2MlGZRSyL9DA1GD9+vIjQksXH/IgRCIlAwYIFadCgQVShQoWQaf2YgIkqzF6fN2+euPqC0z0WRiAcBHD9BldxOnToEE42nnyXicpityJAAlZRCJbAwgjIRACGooMHDyYEpmD5AwEmKgsjYfPmzTRhwgSl495ZaBa/ohACiFuIrWDVqlUVqpV7VWGiMon9xx9/TB999JEIUW7yVU7OCJhCICIigtq3b08PP/ywqfe8mJiJymCv/v7778LsAFFeWBgBJxGA//a+ffsSvIz6VZioDPT8yZMn6ZVXXmFPBwaw4iT2IACL9uHDhxNcyfhR2MtXiF7fu3cvDRkyhEkqBE78sb0IHD58WIxDjEc/Cq+ocuh1BFSAlTmCe7IwAioggCCp2AbWq1dPheo4VgcmqmyghscDuGVhYQRURABuY+CJwS/CRJVFT4OgQFQsjIDKCICoQFh+ENZRZejlqVOnMkllwIT/VBMBfJlivPpBcvuhkUbaeOXKFXr77bfpm2++MZKc0zACSiAAV0KpqanUv39/gt2VV4WJKtCz6WnpNOGNCfT99997tZ+5XR5GAF+uOPAZ9PQgiszlzU2S74kKJPX6+Ndp7dq1Hh7K3DSvI4AvWewKBg8a7Emy8ib9GhyV6FispJikDALGyZRG4IcffhDjGePaa+JrooJOird7XhvS/m4PxjPGtdfEt0SF0xJWnHttOHN7gADGtddOA31JVLCT4sALPKm9jADGt5cMln1HVLA9YWNOL09RblsQAS+NdV8RFe7ueelbJjgg+ScjkB0CGO8Y97qLb4gKt85xwZiFEfAbAhj3untd8AVRwZ/UqFGj2AuC32Yot1cgAGNQjH/MA13F80QFz5xwepeUlKRrH3G9GYGwEcD4HzlyJGE+6CieJyose48cOaJj33CdGQGpCMD5nq7qD08TFQIxsI9zqWOdM9McAcwHzAvdxLNEhZBWiBbDwggwAn9HAPMC80Mn8SRRITgo4u558c6TToOL66omAuKOa2B+YJ7oIp4kKkQwPnfunC59wPVkBBxHAPMD80QX8RxRzZs3j8Os6zL6uJ6uIrBjxw7CfNFBPEVUO3fupAULFuiAO9eREVACAcwXzBvVxTNElZKSIpay6enpqmPO9WMElEEA8wX6XMwflcUzHj5nzpxJp06dUhlrX9QNEX3j4uKoWrVqVKxYMSpQoACdOXNG/Fu3bh0lJiYS7HlY1EHg119/JcyfPn36qFOpDDXxRLgsDH5Y3bK4h0DZsmWpXbt2dMcdd4SsxNatW2nOnDlabDlCNsZDCUaMGEG33Xabki3SnqiSk5NpwIAB4htbSYQ9Xqlrr71WxJZrFN+IyGQQlISEBJo1axadPXvW4yjp0Tysft966y2KjY1VrsLa66jwzYytBYvzCDRv3pzee/c9atTIPEmhtvXr16d3332X2rZtS7lze0YL4XxHSCoR8wjzSUXRekW1fft2Gjp0qIq4erpOt956q9BnFC5cWFo7YXz43nvvcaANaYhaz2j06NFUqVIl6xnY8Ka2RIXTiieffJIVszYMiuyyhHK8a9euVKNGjeyShP0cXz4grH379oWdF2dgDQEciEycOJEiI9XZcGlLVLD/mDt3rrWe4LdMIXDNNdfQI488QtjqORKNNxDtafmK5cIYkfVXprpKWuJHH32U2rRpIy2/cDPSkqiwl0YIa9VtP8LtHBXev/fee6lTp06UL18+x6uTejGV5sydQ0uWLHG8bL8XGBMTI8JuQcGugmhJVG+++SbhxIjFPgRuueUW6tGjB5UqVcq+QgzmfOLECaF037Bhg8E3OJkMBHDYMXDgQBlZhZ2HdkS1e/duevbZZ8NuOGeQNQI33ngjPfHEE4bsobLOwb6nIKoZM2bQ0aNH7SuEc/4bAuPGjaPy5cv/7Zkbf2hHVM8//zxfOrZhpMA8AAabrVq1oly5ctlQgqQsA/qrJV8sEforXd3qSkLCkWwqVqxIY8aMcaSsnApRR62fUy3/9xmuYODGN4tcBO68805x0gZ7JpkkBb9Hq1evpvQ0ifcvA0alUOpPmzaNoD9jsRcBzDfMO7dFqxVVv3792P+5xBFTrlw56t69O1WoUEFirn9ktX79epo+fTpBv3T99ddT585dAgaed0svB/cGEb4c13JY7EGgePHiNGnSJHsyN5irNkS1cuVKcQphsF2cLAcEQBwdO3ak+Pj4HFJZ+wiBNGBtvmnTpkwZgBChoMe9QNny448/Cv0ViJFFPgI4ZW/YsKH8jA3mqAVRwbizd+/eWsclM9gftiaDHqpFixYBm6gOFBUl98oK9EWwa/vyyy9DtqFevXqCsGSbPKSlpRHCmM+fP58uX74csh6cwDgChQoVonfeecc1I1AtiGrZsmU0ZcoU46hyykwI1KpVS5zm3XDDDZk+C+tBQLn91dKvhHL7t99+M5wVjEihvG/RvAVF5pKrKj1//rzQYXkhlLlhQB1ICDcwjRs3dqCkzEWoT1SBidCrdy+h68hcfX4SCoGSJUuKay/Vq1cPldT059AL/etf/6JDhw6Zfjf4Au4LduvWjWrWrBl8JO0nPFfiOs6ePXuk5ennjNBXU9+ZatpLhgzMlCeqhITV9Oab/5TRVl/lAfcrHTp0oPua3Cd9YOECMfRQMk+DqlatKraDuGcmW9idjDxEn3rqKbr7bvmHIqFqqDxR4eLxwYMHQ7WDP78KgaZNm4prL9heyRTofT788EP6/PPPbdMB3X///YR7ZrLrfukS6j6PFi9ebFvdZWKtal64qYALy06L0kSVuCHguXPUSKcx0bY8rEp69uxJOE6WLStWrKAPPvjAESd3ICmsBps3a67FalA21qrnN3zYcIqrEedoNZUmquHDh9OWLVscBUTHwqA7gPsVI26AzbYPeh7YQ+HqktNit34N13HYnYz5Xq1SpYrjrr+VJaoDBw4ocyHSfFc680bw5OyBBx6Q7n4FJ2c4af3hhx+caUwOpcD/FcxTVDmxzKGqvvkIjgFKly7tWHuVJSpMEpglsGSNgF3uV3DdZeGihcrZIgVtwNq3a0/ReaKzBsXiU3YnYx44mCk4GbVGSaJKSU6h7k90J750mnkA2W3djdM8lcOO2W1VjzuEP//8c2bg+cnfEMBqHv7yY2Jj/vbcrj+UJCo4SoNehOUvBDBBoYeqW7fuXw8l/QY7KNhD6XRfDtdwcE/RDt/ecCcDwubrODkPMNi/4YK4E6IkUcFZF3RULCSis7Rs2ZLat28v1bMBsIUeClFHvv76a22hhucHnHRed911UtsAzw/4woQ5Bq/ss4YWOiroqpwQ5YiKHeP91e21a9emXr16SZ+EFLD2X7xksWcmIfRXDz30ELVt09aW6zi6k/lfI0r+b0451lOOqOCyY+nSpfIR1ShHO7c1sE2b8f4MT7rLgXfSzp0727I9htEx9Fc6bY+dGPJNmjQRX6Z2l6UUUeH2e5cuXcSWxO6Gq5g/9FAwdBQBPSVXEPoW3H7Pyv2K5KJczw4HDn379iXYYcmW7777TkR3VvnAQXabc8oPHjBmzpwpXS2RsUyliAp3x1577bWMdfTF33ABbNfRO9yvYKvnN7HLhIPdyfx9JD333HME7xx2ilJENXbsWN9FyoUxI4IpyIw6LAZMQA+F2HizZ88mM+5X7BxsbuSNY3S7YhKeO3dOnJaqYBTrBrbBMqFLHTJkSPBPW34qQ1QXL14U274LFy7Y0lDVMkXUYRCUHe5XONpw5t7GF0GPJ3rYckcN14ygv/LrdZy8efOK7V+ePHkyAy/piTJE9f3339Prr78uqVnqZoMTqscee0w4jKNAoAKZAvcr8L+0du1amdl6Kq9q1aqJLwg7Lm4vX75cuEP2oznDM888Q3fddZdtY0Wua8UwqrlmzZow3tbjVXyrw+4E7oBlkhSuveAIHaYMTFI5jwUcJiBICAw6cXVGpuAQ5O2333b0DpzM+oeTl93zV4kVFZSTWGV4OUQ7SGr06NEkO0Q2HAvOmjXTEfcr4QxkFd+1y7kgCHDIc0No//79KjbbljohBDz0oTLDrV1dUSVWVHDl4mWSwnYPJyMySQr6EESMhvfTs2fPXt2n/LtBBHDIgKtDgwYPkmofhUvTw4YNk+78z2CzXEmG+WunSyYliAox4LwsuAJTpkwZKU3EtZc33niDBg0a5IqPKCmNUCwTkD6IBaYx0PPJELikwd1MP4md81gJotq4caNn+xPH4w+1fSjs9kEP9dlnnwm/4hxdJWw4s8wAdnzQ80HfJyPcVqP4RvLNTrKsuRoP7ZzHrhMVLHwRtNKr0qBBg7D9JyG4Zp++fcQRsB9PlJwcGyCohQsXii8EBIUISwKnuohh6BfBPLbLYt91orKThVUYIDCGsyoIVz5ixAgaM2YMuxyxCqLF96D3wwkt9ICwk7IqbkYXtlrncN6zaz67TlRev3tWvnx50/2OVRPu5SGM9ubNm02/zy/IQwDePHAQAr0g9INmpUiRImZf0Tq9XfNZblxvCxDDitrLAh2VYQlce1nyxRIRdZi3eIZRcyQh9IK4KoPozq1btTbsTiYiIkKc/vmlP+2az66uqHCjX9YpiyOj1eZCJk2eJDyb+mVQ2wyn9Oyhv0LIMPSTGSlatKiZ5FqnxXy2wzOqq0S1bds2rTtFduVTU+VaSsuun275wevnPffcI73aMk4EpVdKoQztmNeuEpVdy0SF+sy1qsBuC3ER4dcaBqd+FFhLDxgwgP75z39S5cqV/QiBK222Y167OoL37NnjCpBeLhTO9zp16vTnSiIuLo5q1qwpJms4p1c6YwbSfvXVVwl6plmzZrG6webOtGNeu7aiunTpMiH6CYscBHDHChFB4Mo543YH9wxhdQ23MlFRUXIK1DAX2DThykzHjh0JrklY7EEA8xrzW6a4RlT79/8ixfpXJhi65gXviiAobPOio7MPznn//ffTpEmTqGLFiro2Nex6g9Dbtm0rCMtOtyRhV1TjDKDDw/yWKa4RlV+djMnsPIQreumll4SdDwIbGJFChQrRmNFjhOV1TqRmJC+d0/zf//0fwYfS+PHjyYqtm85td6Lusuc3E5UTvWZTGVCWwxGcaQlc7WjatKnwneR3JfPNN99Mzz//vGkI+YWcEfAMUbF+KueONvJpuK5fsbp6ddSr1Lt3b8IJmV8lMsK172vPQi57frvWQ0ePHvVsJ2nVsMDqCtFaJk6cSDghZGEEZCAge367QlS4M4UIHizqIAAdF7aSffr0IcRqY2EEwkEA89vK3cjsynSFqLzs1iU7oHV53rhxY3EBF2G8WBiBcBCQOc9dISrZy8JwwOR3MyNQsGBB4fESuiteXWXGh58YQ0DmPHeFqI4fP26spZzKVQSgu5owYQLx6srVbtC2cJnz3BWiOnnypLbg+63iOBkc9sIwcTKIqC0sjIBRBGTOc1eIyi53pUYB5HQmEfjfySAu99apU8fky5zcrwjInOeuEBWHd3J26CIwhAxBZJXBgwcLjwRwocLCCOSEgMx57gpRJSUl5dQ+/kwyAu/PfJ8+/fRTSk+XQ1i49Azd1Z133im5ppydlxCQOc8dJypcWExOTvZSfyjfFngMhXsTXBVBwAgZgtUVAh/ArzuvrmQg6r08MM9lORl0nKjY0NO9Ablr1y4RuBThoGStrhBlBasreHBgYQQyIiBrvjNRZUTW43/D3TECbCKyiszVFfLr168fwSsBCyMQREBbopJpVh8Eg3+aRwBhoBAW/pNPPpG2PI+Pjxex8Fh3Zb4/vPqGrPnu+IqK9VPqDEmsrhBVZeDAgbR3714pFYMrZOiuhg4dSvnz55eSJ2eiLwKy5rvjRJWSkqIv6h6tOe5kwexg7py5lJaWJqWV8NMOb6J+CmkuBTiPZSJrvjtOVBcuXPBYV3inOQsWLhA2UtgWypDY2Fh6+umnxeqKTwZlIKpfHrLmu+NExbHr1B5suEiKrRvMGWSurqZMnkJ169ZVu/FcO+kIyJrvjhPVpUuXpIPBGcpHAAaisJGSFfooJjZGKO9hy8WrK/n9pWqOsua740QlywBM1Y7xUr2OHTsmAiBgdSWr3+644w7C6op1V14aKdm3Rda4cZyoZBkaZg8NfyIbAayu4Plz69atUrLG6gq6K0TQMRo9R0rBnInjCMia744T1ZUrVxwHiwsMH4Fff/1VONNDAM/Ui6nhZxjIARF0Jk+aLHy2S8mQM1EOAVnz3XGiiogI+Axh0RaBr776ivr170fbtm2T0oboPNHC19XLL79M8H3F4i0EZM13x4kqMtLxIr3V8wq0BqurF154gaZNm0YXL16UUqNbb72V3nrrLbrvvvuk5MeZqIGArPnuOGvkzp1bDQS5FmEj8J///EfYXclaXSFOYc+ePemVV17h1VXYvaNGBrLmu+NEFRUVpQaCXAspCMDd7LBhw6SurqpWrSpWV4jmzKI3ArLmu+NEFR0drTfyXPtMCEBhGlxd/fzzz5k+t/IAq6sePXrQq6++SkWLFrWSBb+jAAKy5rvjRJU3b14F4OMq2IEAVlcwOZg8eTLBWZ8MqVy5soji/OCDD8rIjvNwGAFZ891xooqJiXEYKi7OSQSwulq+fLnQXW3atElK0dg+dOnShV577TVeXUlB1LlMZM13x4kKF1VZvI8AIpDA5ACrqwu/y7mIXqFCBbG6euCBB7wPoEdaKGu+O05UHHnXIyPQQDOCq6v+A/qTLN0VVlePP/44jR49mldXBvrA7SSy5rvjRMUXUt0eOs6Xj9VVUHcly+6qUqVKYnXVvHlz5xvEJRpGQNZ8Z6IyDDknDAeB4OoKftU3b94cTlZ/vovVVbdu3cTJYKlSpf58zr+og4C2RAUDMFn7VnW6g2tiFAGsrkaMGEGIupySLMfbK04GEQmnTes2JMsS2mh7OF32CGCea2vwiWaxL+3sO9cvn6xevVrcGVy/fr2UJmNCPNrpURo5ciTddNNNUvLkTMJDQOY8d3zrh6YjAAALI4CQ31CKv/HGG1JXV+PGjaOWLVuSrKNx7ilrCMic565cvGMfRNY63qtvffvtt7Rlyxbq1asXwbFeuILVVefOnQlEyOIeAjLnuSsrKnbn4d7gUbVkkMqYMWOkrq5kfqOripvK9ZI5z10hqiJFiqiML9fNRQSwuoK/q3Xr1rlYCy5aBgIy57krRMWXTGUMA+/mgdUVrsuMHz+eZIUE9y5a6rZM5jx3hahKlCihLrpcM2UQWLNmjfD+iVUWi34IyJznrhAVzOplGYLp131cYzMIwAsDTgVxb/Bc0jkzr3JaFxHA/JZ1fQbNcIWoUHCxYsXwg4URMITAxo0bqUfPHpSQkGAoPSdyFwHZ89s1oipZsqS7SHLp2iGAqLtvvvmmsGxPSkrSrv5+qrDs+e0aUZUtW9ZP/cZtlYgA7grC+yevriSCKjkr2fObiUpyB3F2ziCAUOHB1RUbdjqDuZlSPENUZcrcJO3CohkAvZT2/PnzXmqOpbYEV1eIN0gWY9teTrtsqWx+KWsEcDMA81umuLaiiorKTbL3sTKB0SEvxNZbsWIFwYWKn+Xy5cuECM7PD32e4LfdjMAEYvCgwWZe4bQhEMC8xvyWKa4RFRpRrlw5mW3xXV5nzpyhSZMm0VNPPUU7duzwXfszNhgY9O3bl5YuXRpydbV7926hlIdRadI5VsxnxDKcv+2Y164SFbw0soSPwIEDB2jo0KFCZwN/T34WrK6mTp1KQ18YSojonFF+++03eueddwReshz4ZSzD73/bMa9dJSo4PGORgwC2fzgFe/LJJ+mTTz4hKJv9LNu3b/9zdQVsQGALFy4Ulu5ff/21+NvP+NjZdjvmtdyNpMnWFy5cmG644QY6ffq0yTc5eXYIpKSk0AcffCB0Vx06dKB6dev51uslyBqrK4TvgoX7kSNHsoONn0tCAPMZ81q2uEpUaEzFihUJCk0WuQgcP35cXD1ZuXIlnThxQm7mmuW2Z88ezWqsb3Uxn+0QV7d+aFD16tXtaJeWeRYoUEB6vXH15NixY9Lz9XOG7PM/+963az67vqKyq2HZQ6nuJ4gGjP39jBkzfL8KUrGX4IivY8eOFB8fb6p6Bw8eNJVe58R2zWfXiQruSosXL+5Z/QF0I9dcc43hsQdXvDVq1KAlS5bQ3LlzWelrGDn7EsKAsUWLFvTIIx1M2welp6X7pg8xj2W6H766R13f+qEydrHw1Q1163fY65iVXLly0YMPPkjvv/8+1atXz+zrnF4iArVq1RIK+ccee8w0SaEax477Z9tt5zxWgqhq1qwpcWiplRXCQlkV+PN5+umnRcw6O4zorNbLD+/BunrUqFH03HPPiZNpq20WV3usvqzZe3bOYyWIqkqVKp4NbfT9999T6sXUsIYcLni+/vrrNHDgQA41FhaSoV++9tprqWfPnvTWxLfolltuCf1CDimw7fPLiTZCk2Ee2yVKEBW2OnYuG+0Cz0i+0FHN+3CekaQh09SvXz9wp20atWrVii90h0TLfIKmTZuKO4P33XcfUYT59zO+8dnnn/kmZBfmL+axXaIEUaFxderUsauNruf72Wef0c6dO6XUA5c9oS+BIWPt2rWl5On3TG699VZxZxI+rswcfOSE2/79+2nePDlfUDmVo8pnds/fiMB9KCWu3l+8eJG6BI7nL1y4oAr2UuuBLQW2b7Ktdrdu3SrMGfbt2ye1vn7IDH3RtWtXKUFPr8YLl8Vx99IvhrZ58+almTNnUp48ea6GQervyqyo0Eivbv/QY7gM+8wzz0hbWQVHAfQoE8ZPEPfaQIYsoRHAqgkEhcvJMiIzX13iL7/84iuSQtsxb+0kKZShzIoKlUHQScRz87rA9ODRRx+VrmeC0n7O3DnCBsvrGFpt37333kudOnWSGiEFdYHi/JMFn9C///1v39hNBfsAJ6Mw47BTlCKqtLQ0sf3zg+dKq1bORgYDLt9OmzaNfv75ZyPJfZGmQoUK1KdPHypVqpT09v7444/07rvvkh9d7MCEBts+OxXp6DCliAoVgpJYOD7DHz6Q8uXLU7du3QgTSbZs2LBB6K+OHj0qO2tt8oOldOfOnalu3brS63zo0CFxSgg9oV+lSZMm1KtXL9ubrxxRwZL72Weftb3hqhVw5513Cvsd2YFZ4YsJ13E+/PBD4epEtXbbVR9ce2nZsiW1b99e+rc9Vvxz5swh+LXyu4wbN47wZWu3KEdUaDAMG+G10m+CydWuXTtq3ao1ReaSe87hp8llF+kjeMTiJYt9R/rZzcPSpUsLr7LZfS7zuZJEhRXA9OnTZbZTq7zs3K7gJj/0V05tV3DCBqNXJwQW/N27dyc7XOEmbkikGe/P8OzleSv9A5VF8+bNrbxq+h0liSolOYW6de/mWZsqo70E0wNc57AjWs93331Hs2bNslUB/PDDD1PzZs3pxZdeJBzb2yV2HkzAFgpmDJs2bbKr+lrmC9up6e9Np5jYGEfqryRRoeVTpkyhZcuWOQKC6oXYdaSOU9ZFixbR/PnzpR6pR0RECN/tuPIDQTmIlrNq1Srxt6z/gu5X2rdrT9F5omVlK/KBqQfc7GCrx5IZgcaNG4tT1Myf2PNEWaKCjgq6KpY/EMAW6pFHHhFLbRCBLIGyHSGjcHlahsBn9pAhQ7JUsC5evFicQsooB3lgm9esWTNZ2f2RT0APtXzFcpo9e7Yw0pWbuXdyQ5Rq6KicklyBE7aXnCrMTDn58+cXehSzASXNlKFTWkRR+e9//0vYshUpXISKFisadvWxanjxxRcpMTEx7LyQAQbu6NGjhSPErDKECQbSwGwC7QlXUO+oqCjhFTXcvPA+9HZjx44Vp3mpqeF5vJBRH1XzgJcEXIx3UpRdUQEEKDBHjhrpJB7alFWtWjV64oknsiWFUA2BUejIkSOl3UfDVZTBgwcL4jBSNnw9IQCFDLnrrrtE2VZXmoiC9N5779HatWtlVMfzeQwfNpziasQ52k6liQpIIE6dn3xOm+39Fs1biOs4ZnQ0mzZuorHjxko7jYMf8bZt25qqenJysljN7d2719R72SUue1NZGvHiCDJjh4ZrLx/M+4A+//xzKSu87Ormpeew7J84caLjTVJ26xdEAg65+JsuiEbmn7t27RKW/NBhlbu5XEg/Sl9++aUIoyVj6wVlNsLJC/9NmauW45Po6Ghq1KgRJSUlkQyyOpt0VmyLq1atasi5YELC6sCK8hWxnU5PT8+xrvzhXwg8/vjjVKZMmb8eOPSb8isqGNn16t1L2hbFIVxdKQZ2RPAKkJVnSijN4bVyVcIqKXUrWLCg8BIgY9CCPHFXToaAPOG+GUafWQnc4eCalhVf9lnl56dncIsz9Z2pIb8M7cBE+RUVPC3ChcT69evtaL+n8jx79iwh4Oj+gNM2GD1iNQqBwSWU5j/99JOU9oKcxowZI823Fq5gwCc8lOPhhqLH6gjuf/ETq6ugwDIfJhIgRPiLYjGPAO5M3nzzzeZflPCG+iuqQCMx6Hr37k18Ami8x7GyeOCBBwg2WCApWU7cEBVnwIAB0l3UoGVQrkPBL+sSNbaWuDDLoceMj5vsUhYqVEgYvkZGyr3alV15GZ9rQVSoNFYKb7/9dsb6898OIoBvVFz0tVOw+nv55ZelORh08gqPnbi4nXf//v2pYcOGrlXDHXq00FyAhACHLM4jgK03vJPaTVJoGYgF20pZhpxO3TN0vlecKxHzzk2SQku1ISpUFp4ZWZxFAApU+HqHrZJTAnsoWJ1ju8/iPgIqzDutiAruTu1wMOf+UFCzBrBNwvUaOy5FG2kx9GsvvfQSsS94I2jZkwbzzW43w0ZqrhVRoUE4fmexH4H4+HixkoKrWTcFFvgTJkzgbb9LnQBXLiqIdkT1j3/8g4K38lUA0It1wODs16+fdOd9VrGCzRZWdlnZh1nNk98LjQDmmRPeO0PXRDMdVbBBCMAZtBEKPuOf4SMARTYiijjlDM1MjeH/CKYLTij0zdTLq2kxvzDPVBHtVlQArkCBAtS6dWtVMPREPYoWLSq2WCroI7IDFEp2mEhgtcdiLwKYX5hnqog2dlQZAYMRKC4sHz58OONH/LcFBJo2bSotnLmF4k2/An9lcBfDIh+BEiVKiIvHbhl3ZtUibYkKjdm+fbu4b5ZVw/gZI8AIWEMAPsXs8DtvrTZ/vKXl1i/YYICJuGIsjAAjIAcBzCfVSAot05qo0AAYo6m0l0adWBgBHRHAPFLBuDMr7LQnqtjYWOrbt29WbeNnjAAjYAIBzCPMJxVFe6ICqHFxcYSoGCyMACNgDQHMH8wjVcUTRAVwu3TpQgjcycIIMALmEMC8wfxRWTxDVDBQGzRoEKl0pKpyx3PdGAEggPmCoByqG1B7hqgAesWKFalNmzb4lYURYAQMIID5osNFf08RFfqlQ4cOgrAM9BEnYQR8jQC+2DFfdBDPERVAx1LWTNgkHTqK68gIyEQA8wPzRBfxJFEhrDj0VVYDUurSeVxPRsAKApgXmB+YJ7qIJ4kK4CMCSfv27XXpB64nI+AYApgXV0focazgMAryLFEBk4cffpjq1KkTBjz8KiPgLQQwHzAvdBNPExU6A9a2HBRCt2HJ9bUDAcwDXW9xeJ6o4AxuxIgRlD9/fjv6nvNkBLRAAOMf8wDzQUfxPFGhUxA8cdiwYSLiso6dxHVmBMJBAOHOMP4xD3QVXxAVOgehqHVd9uo6uLjeaiCAce9WKHZZCPiGqAAYwpGr5AdaVidyPoxAdghgvGPc6y6+Iip0VqtWrcQ/3TuO688IhELAS2Pdd0SFzsW3DHsGDTXM+XOdEcD49tLuwZdEhQHYq1cvatCggc5jkevOCGSJwD333CPGd5YfavrQt0SF/howYADdddddmnYdV5sRyIwAxnP//v0zf6D5E18Tlbjz9PQgql27tubdyNVnBEiM40GB8ezFO66+JioM7shckfTM4Gd4ZcUzXWsEsJLCOMZ49qJ4s1UmewqdC5cXrLMyCRwnVwIB6KQwfr1KUgCZiep/Qw3LZURe5tNAJeYeV8IgAhiv0LV6cbt3NQRMVFejEfgdp4GwP2FhBFRHAOMU49UPonVIdzs7aNGiRTR79mw7i+C8GQHLCMBGyk9fqExUOQyVb7/9liZPnkwXL17MIRV/xAg4hwAuGOPunheuxZhBjYkqBFp79+6lUaNGUVJSUoiU/DEjYC8CcNUCLwi6XzC2ghLrqEKghkExduxYdr4XAif+2F4E4PQO49CPJAVkeUVlcHz9/vvvYhu4Zs0ag29wMkZADgJwH4ztnq5O72SgwERlEsWPP/6YPvroI7py5YrJNzk5I2AOAZgcIBCDjj7OzbU0dGomqtAYZUqxefNmmjBhAp07dy7TZ/yAEZCBAOLuIaSVbtFiZLQ9qzyYqLJCxcCz06dP0/jx42nHjh0GUnMSRsA4AohgDEtzneLuGW+dtZRMVNZw+/OtefPm0YIFCyg9Pf3PZ/wLI2AFgcjISGrTpo02YdattNHqO0xUVpG76j2sqrAVPHXq1FVP+VdGwDgCN954o1hFVahQwfhLPkrJRCWps1NSUmjmzJm0bNkySTlyNn5BoHHjxtSlSxeKiYnxS5NNt5OJyjRkOb+QmJgozBjOnDmTc0L+1PcIFChQQJgdxMXF+R6LUAAwUYVCyMLnycnJNGfOHFq6dKmFt/kVPyAArwedOnWi2NhYPzQ37DYyUYUNYfYZbN++naZMmUKHDx/OPhF/4isESpQoQX369KFKlSr5qt3hNpaJKlwEQ7yP00B4Yli4cCFBj8XiTwSgf2rdurXweIDTPRZzCDBRmcPLcmrorOA2JiEhwXIe/KKeCNSvX1+EroJOisUaAkxU1nCz/NauXbtoxowZtHPnTst58It6IADDza5du1L58uX1qLDCtWSicqlz1q1bJxTuR44ccakGXKxdCMDTARTltWrVsqsI3+XLROVyl69cuZLmz59PJ0+edLkmXHy4CBQqVIjatWtHDRs2DDcrfj8DAkxUGQBx408o3FesWCGu4pw4ccKNKnCZYSBQuHBhcfUlPj6eWFEeBpA5vMpElQM4jn8U8ByTsDpBnBAePHjQ8eK5QHMIlCpVKnCS14bq3313wLObuXc5tTkEmKjM4eVY6sQNibTo00W0ZcsWx8rkgowhUKVKFWrVshXF1WCLcmOIhZ+KiSp8DG3N4cCBA/TFF18QAk1cuHDB1rI48+wRgHfNunXrUrNmzah06dLZJ+RPbEGAicoWWOVnmpKcQiu/WUnLly8nkBeLMwiAlBo1akQN72lIMbF8adgZ1DOXwkSVGRPln+zevVso3+G//fz588rXV7cK5suXj+CnHMpxtoFSo/eYqNToB0u1SEtLo59++olWrVpFGzdu5K2hJRT/eClv3rxUvXp1atCgAd1+++2UK1euMHLjV2UjwEQlG1GX8kOQ1A0bNhBWWSAtvlcYuiNw/w7khNVTjRo1CME9WdREgIlKzX4Jq1ZYaeG0cP369YK02Pr9LzhhNQ5yqlmzJuH0jldOf2Gj8m9MVCr3jqS6wUUyVln4B7fJCEzhF0GABLhUqVatmiAouPxl0Q8BJir9+izsGsP6fdu2bQR/WXv27KFDhw7R5cuXw87X7Qxy585NJUuWpHLlyglyqly5MsFqnEV/BJio9O/DsFtw6dJl2r//F9q3b5/4B+I6evSo0nELEfeuWLFigpjKli1L+FemzE0UFZU7bDw4A/UQYKJSr0+UqRFMH+Cd9NixY3T8+HFxcRrbyLNnz1JSUhLB5bJdAhe9+fPnp+uvv56wXcOF3yJFighygp4JJgQs/kGAico/fS29pdguIlo0/oHUQFw4bYQFfWpqKl26dElsKXHp+sqVK4QQ5bi0iy1aVFQURUdHE8wCcPoGYgL5YKWEf0jDwggEEWCiCiLBPxkBRkBZBNh5s7JdwxVjBBiBIAJMVEEk+CcjwAgoiwATlbJdwxVjBBiBIAJMVEEk+CcjwAgoiwATlbJdwxVjBBiBIAJMVEEk+CcjwAgoiwATlbJdwxVjBBiBIAJMVEEk+CcjwAgoiwATlbJdwxVjBBiBIAJMVEEk+CcjwAgoiwATlbJdwxVjBBiBIAJMVEEk+CcjwAgoiwATlbJdwxVjBBiBIAJMVEEk+CcjwAgoiwATlbJdwxVjBBiBIAJMVEEk+CcjwAgoi8D/A92KTO0IEondAAAAAElFTkSuQmCC',
        member_since: 1579608567515341742,
        role_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        last_name: 'Toth',
        title: 'Developer',
        last_login: 1575457623642000000,
        phone: '+34 658658658',
        location: 'Madrid, Spain'
    },
    {
        name: 'Ellen',
        email: 'ellen.martin@mail.com',
        role_name: RoleOptions.NalejAdmin,
        member_since: 1579794101000000,
        role_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        last_name: 'Martin',
        title: 'Operator',
        last_login: 1575457623642000000,
        phone: '+34 658658658',
        location: 'Madrid, Spain'
    },
    {
        name: 'Josh',
        email: 'josh.peterson@mail.com',
        role_name: RoleOptions.NalejAdmin,
        member_since: 1579608567515341742,
        role_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        last_name: 'Peterson',
        title: 'Developer',
        last_login: 1575457623642000000,
        phone: '+34 658658658',
        location: 'Madrid, Spain'
    },
    {
        name: 'Mike',
        email: 'mikeslashis@mail.com',
        role_name: RoleOptions.NalejAdmin,
        member_since: 1579608567515341742,
        role_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        last_name: 'Slashis',
        title: 'Operator',
        last_login: 1575457623642000000,
        phone: '+34 658658658',
        location: 'Madrid, Spain'
    },
];
/**
 * Mocked users list
 */
export const mockUpdateUserList: UpdateUserRequest[] = [
    {
        organization_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        name: 'Mikelanos',
        last_name: 'Lakinoshka',
        email: 'mikeslashis@mail.com',
        role_name: RoleOptions.NalejAdmin,
        title: 'NalejAdmin',
        phone: '+34 655555555',
        location: 'France',
        photo_base64: 'data:image/gif;base64,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',
        update_name: true,
        update_title: true,
        update_phone: true,
        update_location: true,
        update_photo_base64: true,
        update_last_name: true
    }
];

/**
 * Mocked nodes list
 */
export const mockNodesChart = [
    {
        'name': 'Nodes Running',
        'series': [
            {
                'value': 39,
                'name': '-6h'
            },
            {
                'value': 79,
                'name': '-5h'
            },
            {
                'value': 23,
                'name': '-4h'
            },
            {
                'value': 96,
                'name': '-3h'
            },
            {
                'value': 73,
                'name': '-2h'
            },
            {
                'value': 73,
                'name': '-1h'
            },
            {
                'value': 73,
                'name': 'now'
            }
        ]
    }
];

/**
 * Mocked new password
 */
export const mockResetPassword = 'NEW_PASSWORD_1234';

/**
 * Mocked nodes list
 */
export const mockNodeList = [
    {
        node_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d9a',
        ip: '10.240.0.59',
        credentials: 'Private',
        labels: {
            'agentpool': 'default',
            'beta.kubernetes.io/arch': 'amd64',
            'beta.kubernetes.io/instance-type': 'Standard_D2s_v3',
            'beta.kubernetes.io/os': 'linux',
            'failure-domain.beta.kubernetes.io/region': 'eastus2',
            'failure-domain.beta.kubernetes.io/zone': '0',
            'kubernetes.azure.com/cluster': 'Mc_dhs1_k8s_cluster_dhs1_k8s_cluster_eastus2',
            'kubernetes.io/hostname': 'aks.default.37446519-1',
            'kubernetes.io/role': 'agent',
            'node-role.kubernetes.io/agent': '0',
            'storafeprofile': 'managed',
            'storagetier': 'Premium_LRS'
        },
        status_name: 'Running',
        state_name: 'Unregistered',
    }, {
        node_id: 'fcd88a93-9b06-4d3b-a5c0-27f9a3bd1b56b',
        ip: '10.240.0.58',
        credentials: 'Private',
        labels: {
            'agentpool': 'default',
            'beta.kubernetes.io/arch': 'amd64',
            'beta.kubernetes.io/instance-type': 'Standard_D2s_v3',
            'beta.kubernetes.io/os': 'linux',
            'failure-domain.beta.kubernetes.io/region': 'eastus2',
            'failure-domain.beta.kubernetes.io/zone': '0',
            'kubernetes.azure.com/cluster': 'Mc_dhs1_k8s_cluster_dhs1_k8s_cluster_eastus2',
            'kubernetes.io/hostname': 'aks.default.37446519-1',
            'kubernetes.io/role': 'agent',
            'node-role.kubernetes.io/agent': '0',
            'storafeprofile': 'managed',
            'storagetier': 'Premium_LRS'
        },
        status_name: 'Running',
        state_name: 'Unregistered',
    }, {
        node_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d7c',
        ip: '10.240.0.57',
        credentials: 'Private',
        labels: {
            'agentpool': 'default',
            'beta.kubernetes.io/arch': 'amd64',
            'beta.kubernetes.io/instance-type': 'Standard_D2s_v3',
            'beta.kubernetes.io/os': 'linux',
            'failure-domain.beta.kubernetes.io/region': 'eastus2',
            'failure-domain.beta.kubernetes.io/zone': '0',
            'kubernetes.azure.com/cluster': 'Mc_dhs1_k8s_cluster_dhs1_k8s_cluster_eastus2',
            'kubernetes.io/hostname': 'aks.default.37446519-1',
            'kubernetes.io/role': 'agent',
            'node-role.kubernetes.io/agent': '0',
            'storafeprofile': 'managed',
            'storagetier': 'Premium_LRS'
        },
        status_name: 'Running',
        state_name: 'Unregistered',
    }, {
        node_id: 'fcd88a93-9b06-4d3b-a5c0-27f9a3bd1b56d',
        ip: '10.240.0.56',
        credentials: 'Private',
        labels: {
            'agentpool': 'default',
            'beta.kubernetes.io/arch': 'amd64',
            'beta.kubernetes.io/instance-type': 'Standard_D2s_v3',
            'beta.kubernetes.io/os': 'linux',
            'failure-domain.beta.kubernetes.io/region': 'eastus2',
            'failure-domain.beta.kubernetes.io/zone': '0',
            'kubernetes.azure.com/cluster': 'Mc_dhs1_k8s_cluster_dhs1_k8s_cluster_eastus2',
            'kubernetes.io/hostname': 'aks.default.37446519-1',
            'kubernetes.io/role': 'agent',
            'node-role.kubernetes.io/agent': '0',
            'storafeprofile': 'managed',
            'storagetier': 'Premium_LRS'
        },
        status_name: 'Running',
        state_name: 'Unregistered',
    }, {
        node_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d5e',
        ip: '10.240.0.55',
        credentials: 'Private',
        labels: {
            'agentpool': 'default',
            'beta.kubernetes.io/arch': 'amd64',
            'beta.kubernetes.io/instance-type': 'Standard_D2s_v3',
            'beta.kubernetes.io/os': 'linux',
            'failure-domain.beta.kubernetes.io/region': 'eastus2',
            'failure-domain.beta.kubernetes.io/zone': '0',
            'kubernetes.azure.com/cluster': 'Mc_dhs1_k8s_cluster_dhs1_k8s_cluster_eastus2',
            'kubernetes.io/hostname': 'aks.default.37446519-1',
            'kubernetes.io/role': 'agent',
            'node-role.kubernetes.io/agent': '0',
            'storafeprofile': 'managed',
            'storagetier': 'Premium_LRS'
        },
        status_name: 'Running',
        state_name: 'Unregistered',
    }, {
        node_id: 'fcd88a93-9b06-4d3b-a5c0-27f9a3bd1b56f',
        ip: '10.240.0.53',
        credentials: 'Private',
        labels: {
            'agentpool': 'default',
            'beta.kubernetes.io/arch': 'amd64',
            'beta.kubernetes.io/instance-type': 'Standard_D2s_v3',
            'beta.kubernetes.io/os': 'linux',
            'failure-domain.beta.kubernetes.io/region': 'eastus2',
            'failure-domain.beta.kubernetes.io/zone': '0',
            'kubernetes.azure.com/cluster': 'Mc_dhs1_k8s_cluster_dhs1_k8s_cluster_eastus2',
            'kubernetes.io/hostname': 'aks.default.37446519-1',
            'kubernetes.io/role': 'agent',
            'node-role.kubernetes.io/agent': '0',
            'storafeprofile': 'managed',
            'storagetier': 'Premium_LRS'
        },
        status_name: 'Running',
        state_name: 'Unregistered',
    }
];


/**
 * Mocked Apps status timeline
 */
export const mockAppChart = [
    {
        'name': 'Apps Running',
        'series': [
            {
                'value': 39,
                'name': '-6h'
            },
            {
                'value': 79,
                'name': '-5h'
            },
            {
                'value': 23,
                'name': '-4h'
            },
            {
                'value': 96,
                'name': '-3h'
            },
            {
                'value': 40,
                'name': '-2h'
            },
            {
                'value': 73,
                'name': '-1h'
            },
            {
                'value': 23,
                'name': 'now'
            }
        ]
    }
];

/**
 * Mocked Apps Pie Chart
 */
export const mockAppPieChart = [
    {
        name: 'Running',
        value: 5
    },
    {
        name: 'Error',
        value: 4
    }
];

/**
 *  Mocked clusters detail
 */
export const mockClusterDetail = [
    {
        name: 'Cluster1',
        id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d1',
        totalNodes: '10',
        runningNodes: '1',
        description: 'Autodiscovered cluster',
        type: 'Kubernetes',
        status: 'Running',
        tags: 'ny, edge',
        multitenant_support: 'yes'
    }
];

/**
 * Mocked Devices status timeline
 */
export const mockDevicesChart = [
    {
        'name': 'Devices Running',
        'series': [
            {
                'value': 39,
                'name': '-6h'
            },
            {
                'value': 79,
                'name': '-5h'
            },
            {
                'value': 23,
                'name': '-4h'
            },
            {
                'value': 96,
                'name': '-3h'
            },
            {
                'value': 40,
                'name': '-2h'
            },
            {
                'value': 73,
                'name': '-1h'
            },
            {
                'value': 23,
                'name': 'now'
            }
        ]
    }
];

/**
 * Mocked devices list
 */
export const mockDevicesList = [
    [
        {
            organization_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            device_group_id: '70e3b907-54b4-4aa1-9f9b-3b15f1af7d99',
            device_id: 'dh006',
            register_since: '1550746714',
            enabled: true,
            device_status_name: 'OFFLINE',
            labels: {
                'app': 'kuard4',
                'the': 'label'
            }
        },
        {
            organization_id: 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
            device_group_id: 'a56b9900-0fef-41b0-bb7c-adf0055274cd',
            device_id: 'dh007',
            register_since: '1550746656',
            enabled: true,
            device_status_name: 'ONLINE',
            labels: {
                'lab12': 'label12',
                'lab23': 'label22',
                'lab24': 'label22',
                'lab22': 'label22',
                'lab25': 'label22',
                'lab16': 'label12654',
                'lab27': 'label22',
                'lab28': 'label22',
                'lab29': 'label22',
                'lab30': 'label22654',
                'lab31': 'label12',
                'lab32': 'label22',
                'lab33': 'label2298754',
                'lab34': 'label22',
                'lab35': 'label22',
                'lab56': 'label22',
                'lab37': 'label22654',
                'lab38': 'label12',
                'lab39': 'label22',
                'lab40': 'label2298754',
                'lab41': 'label22',
                'lab42': 'label22',
            }
        }
    ],
    [
        {
            organization_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            device_group_id: '70e3b907-54b4-4aa1-9f9b-3b15f1af7d99',
            device_id: 'dh001',
            register_since: '1550746644',
            enabled: true,
            device_status_name: 'OFFLINE',
            labels: {
            }
        }
    ],
    [
        {
            organization_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            device_group_id: '90651fde-4090-47e9-a838-735969d94302',
            device_id: 'dh002',
            register_since: '1550746647',
            enabled: false,
            device_status_name: 'OFFLINE',
            labels: {
            }
        },
        {
            organization_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            device_group_id: '90651fde-4090-47e9-a838-735969d94302',
            device_id: 'dh003',
            register_since: '1550746651',
            enabled: true,
            device_status_name: 'OFFLINE',
            labels: {
                'app2': 'quee2',
                'drone': '321'
            }
        }
    ],
    [
        {
            organization_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            device_group_id: 'dbc47863-4bad-4ea9-92dd-52bad1b395cf',
            device_id: 'dh004',
            register_since: '1550746653',
            enabled: true,
            device_status_name: 'OFFLINE',
            labels: {
            }
        },
        {
            organization_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            device_group_id: 'dbc47863-4bad-4ea9-92dd-52bad1b395cf',
            device_id: 'dh005',
            register_since: '1550746656',
            enabled: true,
            device_status_name: 'OFFLINE',
            labels: {
            }
        }
    ]
];

/**
 * Mocked devices group list
 */
export const mockGroupList: Group[] = [
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'device_group_id': '70e3b907-54b4-4aa1-9f9b-3b15f1af7d99',
        'name': 'drone',
        'created': '1566808602',
        'enabled': true,
        'default_device_connectivity': true,
        'device_group_api_key': 'ce6cc094-300e-4982-bc98-17ca02982e9e'
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'device_group_id': '90651fde-4090-47e9-a838-735969d94302',
        'name': 'group1',
        'created': '1564125271',
        'enabled': true,
        'default_device_connectivity': true,
        'device_group_api_key': 'b0bd74ad-cc16-475b-b748-cedc94f4e0f1'
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'device_group_id': 'dbc47863-4bad-4ea9-92dd-52bad1b395cf',
        'name': 'device_group2',
        'created': '1566986300',
        'device_group_api_key': '982df0a4-843d-401e-9653-ee50ae3636c9'
    }
];

/**
 * Mocked Infrastructure Pie Chart
 */
export const mockInfrastructurePieChart = [
    {
        name: 'Online',
        value: 3
    },
    {
        name: 'Offline',
        value: 5
    }
];

/**
 * Mocked Edge Controller Join Token
 */
export const mockEICJoinToken = {
    organization_id: '999-2ed7-41c1-90fb-f561eb81ea42',
    token: '9wf59-2ed7-41c1-90fb-f561eb81ea42',
    // tslint:disable-next-line: max-line-length
    cacert: '-----BEGIN CERTIFICATE----- MIIC9zCCAd+gAwIBAgIBATANBgkqhkiG9w0BAQsFADAQMQ4wDAYDVQQKEwVOYWxlajAeFw0xOTA1MjgxMzQ0NDBaFw0yMTA1MjcxMzQ0NDBaMBAxDjAMBgNVBAoTBU5hbGVqMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwGJffV/afFQ2SEe7G3rvUFJCjBUCeQX+LsQevY8DSc9LRuWl67TwfzrS2fyFMOUeVZyd5D/9nwreTun3FhvyMkQKHOpoa2cYcYOFcxHGrSeE0iL+VH5+/g7bBiaAZUUh0paHQE6xiKpGxBQhGJrPDyMxlbBrb5fb5VDJA09ph3eZ4DXfC30MiB0Doc/GNEBAlN8qMXschgQV+w/PVtNObUz8jvrxYHM36vT7iWtJQ7zdzv4SxYB21emPrBdzbVkB36fVyQ7RqheLKu6rqYMUV4Nj5kPP6eTza4N32IYvB6SKOnT1Ro1iTHvTPdZhM48d7txQ1ff+cVgG+5EiBi8MKwIDAQABo1wwWjAOBgNVHQ8BAf8EBAMCAqQwEwYDVR0lBAwwCgYIKwYBBQUHAwEwEgYDVR0TAQH/BAgwBgEB/wIBADAfBgNVHREEGDAWghQqLm5hbGVqNDgubmFsZWoudGVjaDANBgkqhkiG9w0BAQsFAAOCAQEAclw2YqEuvWtTaw+fJzX4ByfZh8nrfT1mKoAcJDDHXcEbvES0b8xqXqrGYW1QO92tUgFEw23C43wKJPdzmqIYmy0sR6sghsZJLEQzY3DOXNx2GirREm7jrv66REs1tohhukB1s9PU8oxp+lYzdFtWYW88BB2tg75MMTxS/KxW10966j4aSO53osHXC1/NgWJM/Mm4WG3jAgZFFZc6BBxmjmH8O98KEsQqQOOl3zmOQAtikuE0K2hHOa5dEM5ft5569Fh53WeQr+PFlfNhlaFmmRpKHU9k2eeB7VTTwxIqx3TvA5t41RRyb5X4dr2MVizh04hMhyf4MNGuVy94B6yVw== -----END CERTIFICATE-----',
    join_url: 'http://qwerty',
    expires_on: 1550746676,
    dns_url: 'asdad1231.es'
};

/**
 * Mocked Agent Join Token
 */
export const mockAgentJoinToken = {
    organization_id: '999-2ed7-41c1-90fb-f561eb81ea42',
    edge_controller_id: '7777-0fef-41b0-bb7c-adf0055274cd',
    token: '9wf59-2ed7-41c1-90fb-f561eb81ea42',
    expires_on: 1550746676,
    // tslint:disable-next-line: max-line-length
    ca_cert: '-----BEGIN CERTIFICATE----- MIIC9zCCAd+gAwIBAgIBATANBgkqhkiG9w0BAQsFADAQMQ4wDAYDVQQKEwVOYWxlajAeFw0xOTA1MjgxMzQ0NDBaFw0yMTA1MjcxMzQ0NDBaMBAxDjAMBgNVBAoTBU5hbGVqMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwGJffV/afFQ2SEe7G3rvUFJCjBUCeQX+LsQevY8DSc9LRuWl67TwfzrS2fyFMOUeVZyd5D/9nwreTun3FhvyMkQKHOpoa2cYcYOFcxHGrSeE0iL+VH5+/g7bBiaAZUUh0paHQE6xiKpGxBQhGJrPDyMxlbBrb5fb5VDJA09ph3eZ4DXfC30MiB0Doc/GNEBAlN8qMXschgQV+w/PVtNObUz8jvrxYHM36vT7iWtJQ7zdzv4SxYB21emPrBdzbVkB36fVyQ7RqheLKu6rqYMUV4Nj5kPP6eTza4N32IYvB6SKOnT1Ro1iTHvTPdZhM48d7txQ1ff+cVgG+5EiBi8MKwIDAQABo1wwWjAOBgNVHQ8BAf8EBAMCAqQwEwYDVR0lBAwwCgYIKwYBBQUHAwEwEgYDVR0TAQH/BAgwBgEB/wIBADAfBgNVHREEGDAWghQqLm5hbGVqNDgubmFsZWoudGVjaDANBgkqhkiG9w0BAQsFAAOCAQEAclw2YqEuvWtTaw+fJzX4ByfZh8nrfT1mKoAcJDDHXcEbvES0b8xqXqrGYW1QO92tUgFEw23C43wKJPdzmqIYmy0sR6sghsZJLEQzY3DOXNx2GirREm7jrv66REs1tohhukB1s9PU8oxp+lYzdFtWYW88BB2tg75MMTxS/KxW10966j4aSO53osHXC1/NgWJM/Mm4WG3jAgZFFZc6BBxmjmH8O98KEsQqQOOl3zmOQAtikuE0K2hHOa5dEM5ft5569Fh53WeQr+PFlfNhlaFmmRpKHU9k2eeB7VTTwxIqx3TvA5t41RRyb5X4dr2MVizh04hMhyf4MNGuVy94B6yVw== -----END CERTIFICATE-----',
};

/**
 * Mocked apps Inbounds
 */
export const mockAppsInboundsList = {
    'instance_inbounds':
        [{
            'organization_id': '01014ea3-022a-40d6-943f-8a6b150eb144',
            'app_instance_id': '4979fdce-35c4-40fc-a9cf-36fce6e4ff90',
            'instance_name': 'MySQL-Appnet2',
            'inbound_name': 'mysqlinbound'
        },
        {
            'organization_id': '01014ea3-022a-40d6-943f-8a6b150eb144',
            'app_instance_id': 'b5e6c22b-e1c9-40a9-be68-2d05d6942b20',
            'instance_name': 'MySQL-Appnet1',
            'inbound_name': 'mysqlinbound'
        },
        {
            'organization_id': '01014ea3-022a-40d6-943f-8a6b150eb144',
            'app_instance_id': 'e96afc8e-03ff-4a1d-93f2-47c6fe328950',
            'instance_name': 'InboundTest01',
            'inbound_name': 'INBOUND'
        }]
    };

/**
 * Mocked apps Outbound
 */
export const mockAppsOutboundsList = {
    'instance_outbounds':
    [{
        'organization_id': '01014ea3-022a-40d6-943f-8a6b150eb144',
        'app_instance_id': 'c0bbd957-5dfb-488c-b7aa-7d1f910cb094',
        'instance_name': 'OutboundTest01',
        'outbound_name': 'OUTBOUND'
    }]
};
