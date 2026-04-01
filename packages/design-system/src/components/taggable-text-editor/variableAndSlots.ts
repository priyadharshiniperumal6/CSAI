export function variableAndSlots() {
    return [
        {
            "id": "a73164bf-cdd1-11ef-ac31-6a446f8ab5ec",
            "label": "3p1 check update",
            "type": "INTEGRATION_POINT",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "abcd",
                    "description": "kdkd",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "Result",
                    "description": "kffkf",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"a73164bf-cdd1-11ef-ac31-6a446f8ab5ec\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "b40472c25d9a-403988a073b005c1-4013",
            "label": "AI Agent Id",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"b40472c25d9a-403988a073b005c1-4013\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "55435a6a9af5-43c581887c9ae297-0244",
            "label": "Access Token",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"55435a6a9af5-43c581887c9ae297-0244\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "420f6ef7-d6ed-11ef-883f-c2c2e42f03e9",
            "label": "Account Details",
            "type": "INTEGRATION_POINT",
            "description": "it will provide the account details",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "balance",
                    "description": "it is balance of the account",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                },
                {
                    "name": "accountId",
                    "description": "it is an account identifier",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                },
                {
                    "name": "name",
                    "description": "account name",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                },
                {
                    "name": "accountType",
                    "description": "account type",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"420f6ef7-d6ed-11ef-883f-c2c2e42f03e9\",\"inputs\":[],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "a53be099725e-42389875e58cbfd4-aed9",
            "label": "AccountBalance",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"a53be099725e-42389875e58cbfd4-aed9\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"######\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "957517cb-ad8d-11ef-9275-c6c1ca9eecdf",
            "label": "AccountBalanceTool",
            "type": "INTEGRATION_POINT",
            "description": "AccountBalance",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "accountId",
                    "description": "it is accountId provided by customer",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "balance",
                    "description": "it is get from api response",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"957517cb-ad8d-11ef-9275-c6c1ca9eecdf\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "b92c349c5cec-49be913df7fd422e-5cb0",
            "label": "Accuracy",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"b92c349c5cec-49be913df7fd422e-5cb0\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "394498f2e03f-491aac4e91b64772-4550",
            "label": "Agent Id",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"394498f2e03f-491aac4e91b64772-4550\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "df640ddf0565-459e9878bac0a486-7a06",
            "label": "Agent Name",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"df640ddf0565-459e9878bac0a486-7a06\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "bf76c01c41f2-4134b54ff2801869-74b9",
            "label": "Agent Org Email",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"bf76c01c41f2-4134b54ff2801869-74b9\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "d2cf9b9bf31d-41fabeda18975ff7-8f0c",
            "label": "Agent Skill",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"d2cf9b9bf31d-41fabeda18975ff7-8f0c\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "1b03379f1ee2-43dd894fb598f530-593e",
            "label": "Agent Supervisor",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"1b03379f1ee2-43dd894fb598f530-593e\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "d85b278b6102-4b1d94e7342bd4e0-2a1d",
            "label": "Agent email",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"d85b278b6102-4b1d94e7342bd4e0-2a1d\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "026790c95d8e-421d8204b36e3426-9caa",
            "label": "Altitude",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"026790c95d8e-421d8204b36e3426-9caa\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "9e4666bb6dbb-428baf566a04db66-8a84",
            "label": "Altitude Accuracy",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"9e4666bb6dbb-428baf566a04db66-8a84\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "c92f8819464c-48b4bbb4097903b1-4497",
            "label": "Android Id",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"c92f8819464c-48b4bbb4097903b1-4497\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "6a460720ec82-4f659eba50967a77-9f29",
            "label": "Bearing",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"6a460720ec82-4f659eba50967a77-9f29\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.BOOLEAN.ne",
            "label": "Boolean.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given Boolean values to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Boolean 1",
                    "description": "Compare Boolean 1",
                    "required": true,
                    "repeats": false,
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Boolean 2",
                    "description": "Compare Boolean 2",
                    "required": true,
                    "repeats": false,
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given Boolean values are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.BOOLEAN.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.BOOLEAN.eq",
            "label": "Boolean.Equals",
            "type": "FUNCTION",
            "description": "Compares two given Boolean values to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Boolean 1",
                    "description": "Compare Boolean 1",
                    "required": true,
                    "repeats": false,
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Boolean 2",
                    "description": "Compare Boolean 2",
                    "required": true,
                    "repeats": false,
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given Boolean values are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.BOOLEAN.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "a78ace1ad81d-4721a1963610d871-2567",
            "label": "Boris Boolean",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"a78ace1ad81d-4721a1963610d871-2567\",\"type\":\"VARIABLE\",\"variable_type\":\"BOOLEAN\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "5a7076d327c0-4ad995a045565bc7-3adf",
            "label": "Boris Number",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"5a7076d327c0-4ad995a045565bc7-3adf\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"###,###.##\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "c95f0bc0247d-46ccaa05f165d980-1706",
            "label": "Boris Number 2",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"c95f0bc0247d-46ccaa05f165d980-1706\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"###,###.##\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "6401cc923fc7-42b78060418452c4-a49e",
            "label": "BorisDate",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "DATE",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"6401cc923fc7-42b78060418452c4-a49e\",\"type\":\"VARIABLE\",\"variable_type\":\"DATE\",\"format\":\"dd/MM/yyyy\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "23a1278aea41-47199b5a2129c8f6-2b07",
            "label": "BorisText",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"23a1278aea41-47199b5a2129c8f6-2b07\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"######\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "24dc446ce0c4-4bb79cc4b72abf82-d35a",
            "label": "Bot Output",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": true,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"24dc446ce0c4-4bb79cc4b72abf82-d35a\",\"type\":\"VARIABLE\",\"variable_type\":\"DYNAMIC\",\"format\":\"\",\"non_audit\":true,\"field_path\":\"%%PATH%%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "90c2b4a81209-4613bee39ba04541-850e",
            "label": "Brand",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"90c2b4a81209-4613bee39ba04541-850e\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "f29b91763c33-4eb497058b4523b0-ebd2",
            "label": "Call Now Phone Number",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"f29b91763c33-4eb497058b4523b0-ebd2\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "9cfd32297dcd-4688ac346183cb6e-39d3",
            "label": "Call Now Target Description",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"9cfd32297dcd-4688ac346183cb6e-39d3\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "df030cb3cbb4-409bbbb71ebd0cbe-6435",
            "label": "Call Return Number Entered",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"df030cb3cbb4-409bbbb71ebd0cbe-6435\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "55cfdc62cdfc-480c9e66c144dcbd-88ab",
            "label": "Camera Is Available",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"55cfdc62cdfc-480c9e66c144dcbd-88ab\",\"type\":\"VARIABLE\",\"variable_type\":\"BOOLEAN\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "714efe3bec30-411b8c051dc7eda2-2955",
            "label": "Click to Call Caller ID",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"714efe3bec30-411b8c051dc7eda2-2955\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_BOOLEAN:COLLECTION_CUSTOM.Array.includes",
            "label": "Collection of BOOLEAN.Contains",
            "type": "FUNCTION",
            "description": "Searches (case-sensitive) the Collection to determine whether the specified Element is found.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Collection to search",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "element",
                    "description": "Case-sensitive string to search for in the given Collection",
                    "required": true,
                    "repeats": false,
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the searched Element is found within the given Collection",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.Array.includes\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_BOOLEAN:COLLECTION_CUSTOM.Array.indexOf",
            "label": "Collection of BOOLEAN.Index of",
            "type": "FUNCTION",
            "description": "Searches the given Collection and returns the index location of the specified Element, or 0 if it is not found.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Element",
                    "description": "Element to index",
                    "required": true,
                    "repeats": false,
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "The index location of the specified Element in the Collection",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.Array.indexOf\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_BOOLEAN:COLLECTION_CUSTOM.collection.insert",
            "label": "Collection of BOOLEAN.Insert",
            "type": "FUNCTION",
            "description": "Constructs a new Collection based on the given one with the specified Element inserted in it.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Element",
                    "description": "Element to insert",
                    "required": true,
                    "repeats": false,
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New Collection with the specified Element inserted",
                    "type": "COLLECTION_BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.collection.insert\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_BOOLEAN:COLLECTION_CUSTOM.collection.insertAt",
            "label": "Collection of BOOLEAN.Insert at",
            "type": "FUNCTION",
            "description": "Constructs a new Collection based on the given one with the specified Element inserted at the specified index location.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Element",
                    "description": "Element to insert",
                    "required": true,
                    "repeats": false,
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Index",
                    "description": "Insertion index number",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New Collection with the specified Element inserted at the specified index location",
                    "type": "COLLECTION_BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.collection.insertAt\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"},{\"value\":\"%INPUT_2%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_BOOLEAN:COLLECTION_CUSTOM.collection.removeAt",
            "label": "Collection of BOOLEAN.Remove at",
            "type": "FUNCTION",
            "description": "Constructs a new Collection based on the given one after removing the Element at the specified index location.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Index",
                    "description": "Removal index number",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New Collection without the Element at the specified index location",
                    "type": "COLLECTION_BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.collection.removeAt\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_DATE:COLLECTION_CUSTOM.Array.includes",
            "label": "Collection of DATE.Contains",
            "type": "FUNCTION",
            "description": "Searches (case-sensitive) the Collection to determine whether the specified Element is found.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Collection to search",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_DATE",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "element",
                    "description": "Case-sensitive string to search for in the given Collection",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the searched Element is found within the given Collection",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.Array.includes\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_DATE:COLLECTION_CUSTOM.Array.indexOf",
            "label": "Collection of DATE.Index of",
            "type": "FUNCTION",
            "description": "Searches the given Collection and returns the index location of the specified Element, or 0 if it is not found.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_DATE",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Element",
                    "description": "Element to index",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "The index location of the specified Element in the Collection",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.Array.indexOf\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_DATE:COLLECTION_CUSTOM.collection.insert",
            "label": "Collection of DATE.Insert",
            "type": "FUNCTION",
            "description": "Constructs a new Collection based on the given one with the specified Element inserted in it.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_DATE",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Element",
                    "description": "Element to insert",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New Collection with the specified Element inserted",
                    "type": "COLLECTION_DATE",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.collection.insert\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_DATE:COLLECTION_CUSTOM.collection.insertAt",
            "label": "Collection of DATE.Insert at",
            "type": "FUNCTION",
            "description": "Constructs a new Collection based on the given one with the specified Element inserted at the specified index location.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_DATE",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Element",
                    "description": "Element to insert",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Index",
                    "description": "Insertion index number",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New Collection with the specified Element inserted at the specified index location",
                    "type": "COLLECTION_DATE",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.collection.insertAt\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"},{\"value\":\"%INPUT_2%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_DATE:COLLECTION_CUSTOM.collection.removeAt",
            "label": "Collection of DATE.Remove at",
            "type": "FUNCTION",
            "description": "Constructs a new Collection based on the given one after removing the Element at the specified index location.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_DATE",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Index",
                    "description": "Removal index number",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New Collection without the Element at the specified index location",
                    "type": "COLLECTION_DATE",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.collection.removeAt\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_ENUM_Roles:COLLECTION_CUSTOM.collection.insert",
            "label": "Collection of ENUM_Roles.Insert",
            "type": "FUNCTION",
            "description": "Constructs a new Collection based on the given one with the specified Element inserted in it.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_ENUM_Roles",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Element",
                    "description": "Element to insert",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_Roles",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New Collection with the specified Element inserted",
                    "type": "COLLECTION_ENUM_Roles",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.collection.insert\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_ENUM_Roles:COLLECTION_CUSTOM.collection.insertAt",
            "label": "Collection of ENUM_Roles.Insert at",
            "type": "FUNCTION",
            "description": "Constructs a new Collection based on the given one with the specified Element inserted at the specified index location.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_ENUM_Roles",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Element",
                    "description": "Element to insert",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_Roles",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Index",
                    "description": "Insertion index number",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New Collection with the specified Element inserted at the specified index location",
                    "type": "COLLECTION_ENUM_Roles",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.collection.insertAt\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"},{\"value\":\"%INPUT_2%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_ENUM_Roles:COLLECTION_CUSTOM.collection.removeAt",
            "label": "Collection of ENUM_Roles.Remove at",
            "type": "FUNCTION",
            "description": "Constructs a new Collection based on the given one after removing the Element at the specified index location.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_ENUM_Roles",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Index",
                    "description": "Removal index number",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New Collection without the Element at the specified index location",
                    "type": "COLLECTION_ENUM_Roles",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.collection.removeAt\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_TEXT:COLLECTION_CUSTOM.Array.includes",
            "label": "Collection of TEXT.Contains",
            "type": "FUNCTION",
            "description": "Searches (case-sensitive) the Collection to determine whether the specified Element is found.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Collection to search",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "element",
                    "description": "Case-sensitive string to search for in the given Collection",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the searched Element is found within the given Collection",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.Array.includes\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_TEXT:COLLECTION_CUSTOM.Array.indexOf",
            "label": "Collection of TEXT.Index of",
            "type": "FUNCTION",
            "description": "Searches the given Collection and returns the index location of the specified Element, or 0 if it is not found.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Element",
                    "description": "Element to index",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "The index location of the specified Element in the Collection",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.Array.indexOf\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_TEXT:COLLECTION_CUSTOM.collection.insert",
            "label": "Collection of TEXT.Insert",
            "type": "FUNCTION",
            "description": "Constructs a new Collection based on the given one with the specified Element inserted in it.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Element",
                    "description": "Element to insert",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New Collection with the specified Element inserted",
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.collection.insert\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_TEXT:COLLECTION_CUSTOM.collection.insertAt",
            "label": "Collection of TEXT.Insert at",
            "type": "FUNCTION",
            "description": "Constructs a new Collection based on the given one with the specified Element inserted at the specified index location.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Element",
                    "description": "Element to insert",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Index",
                    "description": "Insertion index number",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New Collection with the specified Element inserted at the specified index location",
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.collection.insertAt\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"},{\"value\":\"%INPUT_2%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COLLECTION_TEXT:COLLECTION_CUSTOM.collection.removeAt",
            "label": "Collection of TEXT.Remove at",
            "type": "FUNCTION",
            "description": "Constructs a new Collection based on the given one after removing the Element at the specified index location.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Source Collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Index",
                    "description": "Removal index number",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New Collection without the Element at the specified index location",
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COLLECTION_CUSTOM.collection.removeAt\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Array.join",
            "label": "Collection.Join",
            "type": "FUNCTION",
            "description": "Creates a new string from all components in the given Collection, using the specified character as a separator.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Collection containing components to join",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Separator",
                    "description": "Separator character to delineate all components",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Delineated string containing all Collection components",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Array.join\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.collection.length",
            "label": "Collection.Length",
            "type": "FUNCTION",
            "description": "Returns the length of the given collection.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "collection",
                    "description": "Given collection",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION.*",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Length of the given collection",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.collection.length\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.array.sum",
            "label": "Collection.Sum",
            "type": "FUNCTION",
            "description": "Returns the result of adding all numbers in the Collection.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Collection containing numbers to calculate",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Sum of all numbers in the given Collection",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.array.sum\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.array.sumsqr",
            "label": "Collection.Sum squares",
            "type": "FUNCTION",
            "description": "Calculates the square of each number in the Collection and then returns the sum of all resulting squared numbers.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Collection",
                    "description": "Collection containing numbers to calculate",
                    "required": true,
                    "repeats": false,
                    "type": "COLLECTION_NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Sum of all squared numbers in the given Collection",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.array.sumsqr\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "a0a39911c142-43c1b5f77ae12278-0a3d",
            "label": "ConditionTest11",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"a0a39911c142-43c1b5f77ae12278-0a3d\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"######\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "6b7d84665bda-4a2cac3ed2c835ce-75bb",
            "label": "Conversation Id",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"6b7d84665bda-4a2cac3ed2c835ce-75bb\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "f83260237ec3-4297bebc63a8217d-fb83",
            "label": "Conversation Promises",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": true,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"f83260237ec3-4297bebc63a8217d-fb83\",\"type\":\"VARIABLE\",\"variable_type\":\"DYNAMIC\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"%%PATH%%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "0a0b687d17a0-46019683039c36ad-1b1c",
            "label": "Conversation Summary",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": true,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"0a0b687d17a0-46019683039c36ad-1b1c\",\"type\":\"VARIABLE\",\"variable_type\":\"DYNAMIC\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"%%PATH%%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "96be64f35a2e-46718e0b180be319-f850",
            "label": "Current Environment",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"96be64f35a2e-46718e0b180be319-f850\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "06baac2fdc21-4a5fa6c71c2e24ae-720e",
            "label": "Customer ID",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"06baac2fdc21-4a5fa6c71c2e24ae-720e\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "3c4cfffc1e63-408c90d1a6fe8d9c-2192",
            "label": "Customer Profile",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"3c4cfffc1e63-408c90d1a6fe8d9c-2192\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "d82fa017ada4-445882847e9652b1-b3f4",
            "label": "DNIS Group",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"d82fa017ada4-445882847e9652b1-b3f4\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "972f5a3ad4d1-4c09abec74a4d96e-9793",
            "label": "DTMF",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"972f5a3ad4d1-4c09abec74a4d96e-9793\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "5a8649473d71-488eae1e723845bb-134d",
            "label": "DanNumber",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"5a8649473d71-488eae1e723845bb-134d\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"###,###.#\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Date.getUTCDate",
            "label": "Date.Day",
            "type": "FUNCTION",
            "description": "Extracts the day of the month as a number from a full date.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Date",
                    "description": "Date to extract the day from; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Day extracted from the full date",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Date.getUTCDate\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.DATE.ne",
            "label": "Date.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given dates to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Date 1",
                    "description": "Compare date 1; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Date 2",
                    "description": "Compare date 2; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given dates are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.DATE.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.DATE.eq",
            "label": "Date.Equals",
            "type": "FUNCTION",
            "description": "Compares two given dates to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Date 1",
                    "description": "Compare date 1; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Date 2",
                    "description": "Compare date 2; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given dates are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.DATE.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.DATE.gt",
            "label": "Date.Greater than",
            "type": "FUNCTION",
            "description": "Compares two given dates to determine if the first date is greater than the second.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Date 1",
                    "description": "Compare date 1; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Date 2",
                    "description": "Compare date 2; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the first given date is greater than the second",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.DATE.gt\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.DATE.gte",
            "label": "Date.Greater than or equals",
            "type": "FUNCTION",
            "description": "Compares two given dates to determine if the first date is greater than or equal to the second.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Date 1",
                    "description": "Compare date 1; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Date 2",
                    "description": "Compare date 2; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the first given date is greater than or equal to the second",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.DATE.gte\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.DATE.lt",
            "label": "Date.Less than",
            "type": "FUNCTION",
            "description": "Compares two given dates to determine if the first date is less than the second.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Date 1",
                    "description": "Compare date 1; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Date 2",
                    "description": "Compare date 2; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the first given date is less than the second",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.DATE.lt\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.DATE.lte",
            "label": "Date.Less than or equals",
            "type": "FUNCTION",
            "description": "Compares two given dates to determine if the first date is less than or equal to the second.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Date 1",
                    "description": "Compare date 1; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Date 2",
                    "description": "Compare date 2; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the first given date is less than or equal to the second",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.DATE.lte\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.Date.getUTCMonth",
            "label": "Date.Month",
            "type": "FUNCTION",
            "description": "Extracts the month portion as a number from a full date.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Date",
                    "description": "Date to extract the month from; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Month extracted from the full date",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.Date.getUTCMonth\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Date.now",
            "label": "Date.Now",
            "type": "FUNCTION",
            "description": "Returns the value of Now as a runtime query.",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns Now from runtime",
                    "type": "DATE",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Date.now\",\"inputs\":[],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "PICK.date.pick",
            "label": "Date.Pick",
            "type": "FUNCTION",
            "description": "Retrieves the first given date if the picker is True; otherwise retrieves the second given date.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Picker",
                    "description": "Picker setting",
                    "required": true,
                    "repeats": false,
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Date 1",
                    "description": "First date to pick; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Date 2",
                    "description": "Second date to pick; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "First or second date value, according to picker setting",
                    "type": "DATE",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"PICK.date.pick\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"},{\"value\":\"%INPUT_2%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.Date.getUTCDay",
            "label": "Date.Week day",
            "type": "FUNCTION",
            "description": "Extracts the day of the week as a number from a full date.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Date",
                    "description": "Date to extract the day from; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Day extracted from the full date",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.Date.getUTCDay\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Date.getFullYear",
            "label": "Date.Year",
            "type": "FUNCTION",
            "description": "Extracts the year portion from a full date.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Date",
                    "description": "Date to extract the year from; use the format MM-DD-YYYY",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Year extracted from the full date",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Date.getFullYear\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "aa5321b4ffdf-45c8aa41253f4f32-8475",
            "label": "Device Name",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"aa5321b4ffdf-45c8aa41253f4f32-8475\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "0b6bb8834cf5-45a3b209218fd8c4-304a",
            "label": "Device OS",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"0b6bb8834cf5-45a3b209218fd8c4-304a\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "cbafb4bd0800-41388a539bd68c5e-6938",
            "label": "Device OS Version",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"cbafb4bd0800-41388a539bd68c5e-6938\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "4fc098bd2ee6-40a397da53e43a38-c834",
            "label": "Device Platform",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"4fc098bd2ee6-40a397da53e43a38-c834\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "d4bad03ec81c-479a8f3ea2990798-c5cd",
            "label": "Device Serial ID",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"d4bad03ec81c-479a8f3ea2990798-c5cd\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.DYNAMIC.ne",
            "label": "Dynamic.Does not equal",
            "type": "FUNCTION",
            "description": "Compares the two dynamic values and returns True if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Dynamic 1",
                    "description": "Dynamic value 1",
                    "required": true,
                    "repeats": false,
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Dynamic 2",
                    "description": "Dynamic value 2",
                    "required": true,
                    "repeats": true,
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two dynamic values are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.DYNAMIC.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.DYNAMIC.eq",
            "label": "Dynamic.Equals",
            "type": "FUNCTION",
            "description": "Compares the two dynamic values and returns True if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Dynamic 1",
                    "description": "Dynamic value 1",
                    "required": true,
                    "repeats": false,
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Dynamic 2",
                    "description": "Dynamic value 2",
                    "required": true,
                    "repeats": true,
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two dynamic values are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.DYNAMIC.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "PICK.dynamic.pick",
            "label": "Dynamic.Pick",
            "type": "FUNCTION",
            "description": "Retrieves the first given variable if the picker is True; otherwise retrieves the second given variable.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Picker",
                    "description": "Picker setting",
                    "required": true,
                    "repeats": false,
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Var 1",
                    "description": "First variable to pick",
                    "required": true,
                    "repeats": false,
                    "type": ".*",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Var 2",
                    "description": "Second variable to pick",
                    "required": true,
                    "repeats": false,
                    "type": ".*",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "First or second variable value, according to picker setting",
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"PICK.dynamic.pick\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"},{\"value\":\"%INPUT_2%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "a3f9f0fefa6a-4bc6b25ee4304ba1-80f7",
            "label": "Engine Response",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"a3f9f0fefa6a-4bc6b25ee4304ba1-80f7\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"COLLECTION\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "a3f9f0fefa6a-4bc6b25ee4304ba1-80f7_elementAt",
            "label": "Engine Response.elementAt",
            "type": "FUNCTION",
            "description": "Get element from collection",
            "constant": false,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Index",
                    "description": "The index of the element",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "The element of the collection",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"a3f9f0fefa6a-4bc6b25ee4304ba1-80f7\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"COLLECTION\",\"format\":\"\",\"non_audit\":false,\"index\":\"%INPUT_0%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "7b98ea766844-465da3d9db145632-ca6f",
            "label": "External Session Id",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"7b98ea766844-465da3d9db145632-ca6f\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "e9a376650218-4044870ef13de7ea-9874",
            "label": "First Name",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"e9a376650218-4044870ef13de7ea-9874\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "0d46edf5-d42d-11ef-ace1-06642d1f6e9b",
            "label": "Get Weather Details 1",
            "type": "INTEGRATION_POINT",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "date",
                    "description": "",
                    "required": true,
                    "repeats": false,
                    "type": "DATE",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "WeatherDetails",
                    "description": "",
                    "type": "OBJECT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"0d46edf5-d42d-11ef-ace1-06642d1f6e9b\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "638f81948a18-4e1887623d092125-c4e7",
            "label": "Group",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"638f81948a18-4e1887623d092125-c4e7\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "844575786193-4e1cab6aa19118a2-4ae9",
            "label": "ICCID",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"844575786193-4e1cab6aa19118a2-4ae9\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "eb863095d0ac-4b3ab262ec92a045-7f9d",
            "label": "IMEI",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"eb863095d0ac-4b3ab262ec92a045-7f9d\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "8d1cc7ffe839-42b1abf5616a5b4f-0411",
            "label": "IMSI",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"8d1cc7ffe839-42b1abf5616a5b4f-0411\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "6ba7707d2995-448f931b850a4fd8-e4eb",
            "label": "IP Response",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": true,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"6ba7707d2995-448f931b850a4fd8-e4eb\",\"type\":\"VARIABLE\",\"variable_type\":\"DYNAMIC\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"%%PATH%%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "d0aba776-ad9a-11ef-a78f-1236493c6477",
            "label": "IPAccountDetails",
            "type": "INTEGRATION_POINT",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "balance",
                    "description": "",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                },
                {
                    "name": "accountId",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                },
                {
                    "name": "name",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                },
                {
                    "name": "accountType",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"d0aba776-ad9a-11ef-a78f-1236493c6477\",\"inputs\":[],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "a8eafbae-ad9a-11ef-a78f-1236493c6477",
            "label": "IPBalanceDetails",
            "type": "INTEGRATION_POINT",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "balance",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"a8eafbae-ad9a-11ef-a78f-1236493c6477\",\"inputs\":[],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "384322056a07-4768857b0e830ac0-8d09",
            "label": "Intent Probability",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"384322056a07-4768857b0e830ac0-8d09\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "bba14f627b94-4a0a9b814709d7db-1aa7",
            "label": "Interaction unique ID",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"bba14f627b94-4a0a9b814709d7db-1aa7\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "8073afea5b8e-4007a48247187f3f-4871",
            "label": "JMA Module Version",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"8073afea5b8e-4007a48247187f3f-4871\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "67a798bd231e-4978bec8b5b2bcef-7dca",
            "label": "JMA Version",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"67a798bd231e-4978bec8b5b2bcef-7dca\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "f582f6452284-4eae952309f39948-5aac",
            "label": "Language",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"f582f6452284-4eae952309f39948-5aac\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "a55e5754d614-4129b9ef7d82c65f-3d8d",
            "label": "Language detected by LID",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"a55e5754d614-4129b9ef7d82c65f-3d8d\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"COLLECTION\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "a55e5754d614-4129b9ef7d82c65f-3d8d_elementAt",
            "label": "Language detected by LID.elementAt",
            "type": "FUNCTION",
            "description": "Get element from collection",
            "constant": false,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Index",
                    "description": "The index of the element",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "The element of the collection",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"a55e5754d614-4129b9ef7d82c65f-3d8d\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"COLLECTION\",\"format\":\"\",\"non_audit\":false,\"index\":\"%INPUT_0%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "c1e5cdb7e44c-478593c9bf598ab8-70d2",
            "label": "Last AI Response",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": true,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"c1e5cdb7e44c-478593c9bf598ab8-70d2\",\"type\":\"VARIABLE\",\"variable_type\":\"DYNAMIC\",\"format\":\"\",\"non_audit\":true,\"field_path\":\"%%PATH%%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "dafad558cbea-4218aef2d3e59397-5ac5",
            "label": "Last Name",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"dafad558cbea-4218aef2d3e59397-5ac5\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "14c7d00367d1-489f8fd9cc82b9e9-5036",
            "label": "Last Received UAssist Alert",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "OBJECT_UAssist Alert",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"14c7d00367d1-489f8fd9cc82b9e9-5036\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "14c7d00367d1-489f8fd9cc82b9e9-5036:Business Process",
            "label": "Last Received UAssist Alert.Business Process",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"14c7d00367d1-489f8fd9cc82b9e9-5036\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"Business Process\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "14c7d00367d1-489f8fd9cc82b9e9-5036:ID",
            "label": "Last Received UAssist Alert.ID",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"14c7d00367d1-489f8fd9cc82b9e9-5036\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"ID\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "14c7d00367d1-489f8fd9cc82b9e9-5036:LOB",
            "label": "Last Received UAssist Alert.LOB",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"14c7d00367d1-489f8fd9cc82b9e9-5036\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"LOB\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "14c7d00367d1-489f8fd9cc82b9e9-5036:Name",
            "label": "Last Received UAssist Alert.Name",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"14c7d00367d1-489f8fd9cc82b9e9-5036\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"Name\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "14c7d00367d1-489f8fd9cc82b9e9-5036:Recipient",
            "label": "Last Received UAssist Alert.Recipient",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"14c7d00367d1-489f8fd9cc82b9e9-5036\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"Recipient\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "14c7d00367d1-489f8fd9cc82b9e9-5036:Type",
            "label": "Last Received UAssist Alert.Type",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"14c7d00367d1-489f8fd9cc82b9e9-5036\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"Type\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ea008d71909e-4773b10e8000cff1-23f1",
            "label": "Last Received UAssist Entity",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "OBJECT_UAssist Entity",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ea008d71909e-4773b10e8000cff1-23f1\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":true}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ea008d71909e-4773b10e8000cff1-23f1:Business Process",
            "label": "Last Received UAssist Entity.Business Process",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ea008d71909e-4773b10e8000cff1-23f1\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":true,\"field_path\":\"Business Process\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ea008d71909e-4773b10e8000cff1-23f1:Confidence Score",
            "label": "Last Received UAssist Entity.Confidence Score",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ea008d71909e-4773b10e8000cff1-23f1\",\"valueType\":\"NUMBER\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":true,\"field_path\":\"Confidence Score\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ea008d71909e-4773b10e8000cff1-23f1:LOB",
            "label": "Last Received UAssist Entity.LOB",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ea008d71909e-4773b10e8000cff1-23f1\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":true,\"field_path\":\"LOB\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ea008d71909e-4773b10e8000cff1-23f1:Value",
            "label": "Last Received UAssist Entity.Value",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ea008d71909e-4773b10e8000cff1-23f1\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":true,\"field_path\":\"Value\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "b91a5636bee3-48f3bce2b69b832f-e008",
            "label": "Last Received UAssist Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "OBJECT_UAssist Intent",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"b91a5636bee3-48f3bce2b69b832f-e008\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "b91a5636bee3-48f3bce2b69b832f-e008:Business Process",
            "label": "Last Received UAssist Intent.Business Process",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"b91a5636bee3-48f3bce2b69b832f-e008\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"Business Process\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "b91a5636bee3-48f3bce2b69b832f-e008:Confidence Score",
            "label": "Last Received UAssist Intent.Confidence Score",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"b91a5636bee3-48f3bce2b69b832f-e008\",\"valueType\":\"NUMBER\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"Confidence Score\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "b91a5636bee3-48f3bce2b69b832f-e008:Intent",
            "label": "Last Received UAssist Intent.Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"b91a5636bee3-48f3bce2b69b832f-e008\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"Intent\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "b91a5636bee3-48f3bce2b69b832f-e008:LOB",
            "label": "Last Received UAssist Intent.LOB",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"b91a5636bee3-48f3bce2b69b832f-e008\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"LOB\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "6d9e8e7b70af-4a52baf3d655cafb-ee57",
            "label": "Latitude",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"6d9e8e7b70af-4a52baf3d655cafb-ee57\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "6d505c0ddf29-4448a329c6a630fc-5b03",
            "label": "Locale",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"6d505c0ddf29-4448a329c6a630fc-5b03\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "6d92ad09ade7-4c2181c85fa70783-01b1",
            "label": "Longitude",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"6d92ad09ade7-4c2181c85fa70783-01b1\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "720c8a660203-45c997c4f766d129-0b62",
            "label": "Manufacturer",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"720c8a660203-45c997c4f766d129-0b62\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "0d554d81d4d4-4d1f975770659b2a-2852",
            "label": "MayVA_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_MayVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"0d554d81d4d4-4d1f975770659b2a-2852\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_MayVA_Intents:Agent transfer",
            "label": "MayVA_Intents.Agent transfer",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_MayVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_MayVA_Intents:Agent transfer\",\"valueType\":\"MayVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Agent transfer\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_MayVA_Intents:Book flight",
            "label": "MayVA_Intents.Book flight",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_MayVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_MayVA_Intents:Book flight\",\"valueType\":\"MayVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Book flight\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_MayVA_Intents:Book hotel",
            "label": "MayVA_Intents.Book hotel",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_MayVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_MayVA_Intents:Book hotel\",\"valueType\":\"MayVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Book hotel\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_MayVA_Intents:Call me",
            "label": "MayVA_Intents.Call me",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_MayVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_MayVA_Intents:Call me\",\"valueType\":\"MayVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Call me\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_MayVA_Intents:Card balance",
            "label": "MayVA_Intents.Card balance",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_MayVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_MayVA_Intents:Card balance\",\"valueType\":\"MayVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Card balance\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "MayVA_Intents:ENUM_COMPARE.enum.ne",
            "label": "MayVA_Intents.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_MayVA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_MayVA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "MayVA_Intents:ENUM_COMPARE.enum.eq",
            "label": "MayVA_Intents.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_MayVA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_MayVA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_MayVA_Intents:Global",
            "label": "MayVA_Intents.Global",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_MayVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_MayVA_Intents:Global\",\"valueType\":\"MayVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Global\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_MayVA_Intents:Refuse",
            "label": "MayVA_Intents.Refuse",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_MayVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_MayVA_Intents:Refuse\",\"valueType\":\"MayVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Refuse\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_MayVA_Intents:Yes",
            "label": "MayVA_Intents.Yes",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_MayVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_MayVA_Intents:Yes\",\"valueType\":\"MayVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Yes\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_MayVA_Intents:test",
            "label": "MayVA_Intents.test",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_MayVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_MayVA_Intents:test\",\"valueType\":\"MayVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"test\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "13f4fd90438c-4a59b266bc347230-3ff6",
            "label": "MichalVa_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_MichalVa_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"13f4fd90438c-4a59b266bc347230-3ff6\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "MichalVa_Intents:ENUM_COMPARE.enum.ne",
            "label": "MichalVa_Intents.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_MichalVa_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_MichalVa_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "MichalVa_Intents:ENUM_COMPARE.enum.eq",
            "label": "MichalVa_Intents.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_MichalVa_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_MichalVa_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_MichalVa_Intents:intent1",
            "label": "MichalVa_Intents.intent1",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_MichalVa_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_MichalVa_Intents:intent1\",\"valueType\":\"MichalVa_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"intent1\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_MichalVa_Intents:intent2",
            "label": "MichalVa_Intents.intent2",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_MichalVa_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_MichalVa_Intents:intent2\",\"valueType\":\"MichalVa_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"intent2\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_MichalVa_Intents:intent3",
            "label": "MichalVa_Intents.intent3",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_MichalVa_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_MichalVa_Intents:intent3\",\"valueType\":\"MichalVa_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"intent3\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "d235a844-bb93-11ef-8041-9a47a9f16e6b",
            "label": "NastiaTool",
            "type": "INTEGRATION_POINT",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "accountID",
                    "description": "",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "res",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"d235a844-bb93-11ef-8041-9a47a9f16e6b\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "64671083d8eb-4cdf94244a8c9768-4ba0",
            "label": "Navigation Current Page",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"64671083d8eb-4cdf94244a8c9768-4ba0\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "b2ac61990a94-489d9b9658466ec0-a84e",
            "label": "Navigation Start Time",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "DATE",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"b2ac61990a94-489d9b9658466ec0-a84e\",\"type\":\"VARIABLE\",\"variable_type\":\"DATE\",\"format\":\"MM/dd/yyyy\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "e51de7d3f5b7-49d5b6984021581e-71da",
            "label": "NewVA_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_NewVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"e51de7d3f5b7-49d5b6984021581e-71da\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NewVA_Intents:ENUM_COMPARE.enum.ne",
            "label": "NewVA_Intents.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_NewVA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_NewVA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NewVA_Intents:ENUM_COMPARE.enum.eq",
            "label": "NewVA_Intents.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_NewVA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_NewVA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_NewVA_Intents:agent_transfer",
            "label": "NewVA_Intents.agent_transfer",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_NewVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_NewVA_Intents:agent_transfer\",\"valueType\":\"NewVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"agent_transfer\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_NewVA_Intents:card balance",
            "label": "NewVA_Intents.card balance",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_NewVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_NewVA_Intents:card balance\",\"valueType\":\"NewVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"card balance\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_NewVA_Intents:goodbye",
            "label": "NewVA_Intents.goodbye",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_NewVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_NewVA_Intents:goodbye\",\"valueType\":\"NewVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"goodbye\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_NewVA_Intents:user details",
            "label": "NewVA_Intents.user details",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_NewVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_NewVA_Intents:user details\",\"valueType\":\"NewVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"user details\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_NewVA_Intents:yes",
            "label": "NewVA_Intents.yes",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_NewVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_NewVA_Intents:yes\",\"valueType\":\"NewVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"yes\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "c5c4bd12dbe7-404095a9aa557e32-cf20",
            "label": "Non Audit",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"c5c4bd12dbe7-404095a9aa557e32-cf20\",\"type\":\"VARIABLE\",\"variable_type\":\"BOOLEAN\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Math.abs",
            "label": "Number.Abs",
            "type": "FUNCTION",
            "description": "Calculates the absolute value of a given number.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number",
                    "description": "Number to calculate",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns the absolute value of the number",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Math.abs\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.number.sum",
            "label": "Number.Add",
            "type": "FUNCTION",
            "description": "Returns the result of adding the second number (and any subsequent numbers if applicable) to the first.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "num 1",
                    "description": "Number to add",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "num 2",
                    "description": "Number to add",
                    "required": true,
                    "repeats": true,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Resulting sum of the add operation",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.number.sum\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Math.ceil",
            "label": "Number.Ceil",
            "type": "FUNCTION",
            "description": "Rounds the given number up to the smallest integer that is greater than or equal to it.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number",
                    "description": "Number to round",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns the first integer that is greater than or equal to the given number",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Math.ceil\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Math.cbrt",
            "label": "Number.Cube root",
            "type": "FUNCTION",
            "description": "Calculates the cube root of a given number.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number",
                    "description": "Number to calculate",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns the cube root of the number",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Math.cbrt\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.num.div",
            "label": "Number.Divide",
            "type": "FUNCTION",
            "description": "Divides the first given number by the second given number.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number 1",
                    "description": "Dividend number",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Number 2",
                    "description": "Divisor number",
                    "required": true,
                    "repeats": true,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Quotient of the division operation",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.num.div\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.NUMBER.ne",
            "label": "Number.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given numbers to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number 1",
                    "description": "Compare number 1",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Number 2",
                    "description": "Compare number 2",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given numbers are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.NUMBER.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.NUMBER.eq",
            "label": "Number.Equals",
            "type": "FUNCTION",
            "description": "Compares two given numbers to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number 1",
                    "description": "Compare number 1",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Number 2",
                    "description": "Compare number 2",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given numbers are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.NUMBER.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Math.exp",
            "label": "Number.Exp",
            "type": "FUNCTION",
            "description": "Calculates e raised to the exponential power of the given number.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number",
                    "description": "Power number",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns e raised to the given power number",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Math.exp\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Math.floor",
            "label": "Number.Floor",
            "type": "FUNCTION",
            "description": "Rounds the given number down to the largest integer that is less than or equal to it.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number",
                    "description": "Number to round",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns the largest integer that is less than or equal to the given number",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Math.floor\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.NUMBER.gt",
            "label": "Number.Greater than",
            "type": "FUNCTION",
            "description": "Compares two given numbers to determine if the first number is greater than the second.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number 1",
                    "description": "Compare number 1",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Number 2",
                    "description": "Compare number 2",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the first given number is greater than the second",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.NUMBER.gt\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.NUMBER.gte",
            "label": "Number.Greater than or equals",
            "type": "FUNCTION",
            "description": "Compares two given numbers to determine if the first number is greater than or equal to the second.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number 1",
                    "description": "Compare number 1",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Number 2",
                    "description": "Compare number 2",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the first given number is greater than or equal to the second",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.NUMBER.gte\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Number.isInteger",
            "label": "Number.Is integer",
            "type": "FUNCTION",
            "description": "Tests whether the given number is an integer.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number",
                    "description": "Number to test",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the given number is an integer",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Number.isInteger\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.NUMBER.lt",
            "label": "Number.Less than",
            "type": "FUNCTION",
            "description": "Compares two given numbers to determine if the first number is less than the second.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number 1",
                    "description": "Compare number 1",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Number 2",
                    "description": "Compare number 2",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the first given number is less than the second",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.NUMBER.lt\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.NUMBER.lte",
            "label": "Number.Less than or equals",
            "type": "FUNCTION",
            "description": "Compares two given numbers to determine if the first number is less than or equal to the second.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number 1",
                    "description": "Compare number 1",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Number 2",
                    "description": "Compare number 2",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the first given number is less than or equal to the second",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.NUMBER.lte\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Math.log",
            "label": "Number.Ln",
            "type": "FUNCTION",
            "description": "Calculates the natural logarithm (base e) of the given number.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number",
                    "description": "Number to calculate",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns the natural logarithm (base e) of the given number",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Math.log\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Math.log10",
            "label": "Number.Log10",
            "type": "FUNCTION",
            "description": "Calculates the base 10 logarithm of the given number.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number",
                    "description": "Number to calculate",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns the base 10 logarithm of the given number",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Math.log10\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Math.log2",
            "label": "Number.Log2",
            "type": "FUNCTION",
            "description": "Calculates the base 2 logarithm of the given number.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number",
                    "description": "Number to calculate",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns the base 2 logarithm of the given number",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Math.log2\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Math.max",
            "label": "Number.Max",
            "type": "FUNCTION",
            "description": "Compares two given numbers to determine which is largest.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number 1",
                    "description": "Compare number 1",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Number 2",
                    "description": "Compare number 2",
                    "required": true,
                    "repeats": true,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns the larger of two given numbers",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Math.max\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Math.min",
            "label": "Number.Min",
            "type": "FUNCTION",
            "description": "Compares two given numbers to determine which is smallest.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number 1",
                    "description": "Compare number 1",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Number 2",
                    "description": "Compare number 2",
                    "required": true,
                    "repeats": true,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns the smaller of two given numbers",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Math.min\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.num.mul",
            "label": "Number.Multiply",
            "type": "FUNCTION",
            "description": "Multiples the first given number by the second given number.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number 1",
                    "description": "First number to multiply",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Number 2",
                    "description": "Second number to multiply",
                    "required": true,
                    "repeats": true,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Product of multiplying the two given numbers",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.num.mul\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "PICK.num.pick",
            "label": "Number.Pick",
            "type": "FUNCTION",
            "description": "Retrieves the first given number if the picker is True; otherwise retrieves the second given number.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Picker",
                    "description": "Picker setting",
                    "required": true,
                    "repeats": false,
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Number 1",
                    "description": "First number to pick",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Number 2",
                    "description": "Second text to pick",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "First or second number value, according to picker setting",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"PICK.num.pick\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"},{\"value\":\"%INPUT_2%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Math.pow",
            "label": "Number.Power",
            "type": "FUNCTION",
            "description": "Calculates the value of the given number raised to the power specified in a second number.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number 1",
                    "description": "Number to calculate",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Number 2",
                    "description": "Power to raise",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns the value of the given number raised to the power specified",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Math.pow\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Math.random",
            "label": "Number.Random",
            "type": "FUNCTION",
            "description": "Provides a pseudo-random number greater than or equal to 0 and less than 1.",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns a pseudo-random number",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Math.random\",\"inputs\":[],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.Number.round",
            "label": "Number.Round",
            "type": "FUNCTION",
            "description": "Rounds a number to a specified number of digits.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number",
                    "description": "Number you want to round",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Digits",
                    "description": "Number of digits to which you want to round",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Result of the rounding operation",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.Number.round\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Math.sqrt",
            "label": "Number.Square root",
            "type": "FUNCTION",
            "description": "Calculates the square root of the given number.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Number",
                    "description": "Number to calculate",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns the square root of the given number",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Math.sqrt\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.Number.subtract",
            "label": "Number.Subtract",
            "type": "FUNCTION",
            "description": "Returns the result of subtracting the second number (and any subsequent numbers if applicable) from the first.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "num 1",
                    "description": "Number to subtract from",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "num 2",
                    "description": "Number to subtract",
                    "required": true,
                    "repeats": true,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Result of the subtract operation",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.Number.subtract\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "de206410dae6-4714b927a87e8758-2348",
            "label": "PapaPetux",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"de206410dae6-4714b927a87e8758-2348\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"######\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "432ce182f4fe-497a9fa5ff932f18-01d9",
            "label": "Phone Number",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"432ce182f4fe-497a9fa5ff932f18-01d9\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "cd6b0ab245f2-4bfea6672e1bdd52-ecbd",
            "label": "Promise ID",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"cd6b0ab245f2-4bfea6672e1bdd52-ecbd\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "fca78011ce99-44258faf6455ac09-27ce",
            "label": "Promise Tracking Status",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_Promise Tracking Status",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"fca78011ce99-44258faf6455ac09-27ce\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_Promise Tracking Status:Completed",
            "label": "Promise Tracking Status.Completed",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_Promise Tracking Status",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_Promise Tracking Status:Completed\",\"valueType\":\"Promise Tracking Status\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Completed\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "Promise Tracking Status:ENUM_COMPARE.enum.ne",
            "label": "Promise Tracking Status.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_Promise Tracking Status",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_Promise Tracking Status",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "Promise Tracking Status:ENUM_COMPARE.enum.eq",
            "label": "Promise Tracking Status.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_Promise Tracking Status",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_Promise Tracking Status",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_Promise Tracking Status:Error",
            "label": "Promise Tracking Status.Error",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_Promise Tracking Status",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_Promise Tracking Status:Error\",\"valueType\":\"Promise Tracking Status\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Error\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_Promise Tracking Status:Failed",
            "label": "Promise Tracking Status.Failed",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_Promise Tracking Status",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_Promise Tracking Status:Failed\",\"valueType\":\"Promise Tracking Status\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Failed\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_Promise Tracking Status:In Progress",
            "label": "Promise Tracking Status.In Progress",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_Promise Tracking Status",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_Promise Tracking Status:In Progress\",\"valueType\":\"Promise Tracking Status\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"In Progress\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_Promise Tracking Status:Unknown",
            "label": "Promise Tracking Status.Unknown",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_Promise Tracking Status",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_Promise Tracking Status:Unknown\",\"valueType\":\"Promise Tracking Status\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Unknown\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "2ca101efa72a-4753b64a5291169b-9a66",
            "label": "Protocol Version",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"2ca101efa72a-4753b64a5291169b-9a66\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "f33d1ffbf8d3-43aeb55661122e07-d57b",
            "label": "Received UAssist Alerts",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": true,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"f33d1ffbf8d3-43aeb55661122e07-d57b\",\"type\":\"VARIABLE\",\"variable_type\":\"DYNAMIC\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"%%PATH%%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "02831fc840d8-451ba163c42650a6-7a9f",
            "label": "Received UAssist Entities",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": true,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"02831fc840d8-451ba163c42650a6-7a9f\",\"type\":\"VARIABLE\",\"variable_type\":\"DYNAMIC\",\"format\":\"\",\"non_audit\":true,\"field_path\":\"%%PATH%%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "875cd9311267-4d8b83dc7fffdc0b-2c04",
            "label": "Received UAssist Intents",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": true,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"875cd9311267-4d8b83dc7fffdc0b-2c04\",\"type\":\"VARIABLE\",\"variable_type\":\"DYNAMIC\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"%%PATH%%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "e53ead403e6e-4443b12ae360c9cc-dcd6",
            "label": "SIM State",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"e53ead403e6e-4443b12ae360c9cc-dcd6\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "77ca68d53631-4bb68ba58958c386-e1f3",
            "label": "SIP Phone Number",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"77ca68d53631-4bb68ba58958c386-e1f3\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "66d3cca2af1f-41cc92f4f99f2b9f-b8e3",
            "label": "SIP Skill Group",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"66d3cca2af1f-41cc92f4f99f2b9f-b8e3\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "a6159519b1f9-4ebf8c09c3a31e53-a117",
            "label": "SIP Transfer URL",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"a6159519b1f9-4ebf8c09c3a31e53-a117\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "fc87ca80c9f6-4efa810aa826fc1c-f7e6",
            "label": "Satisfaction Score",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"fc87ca80c9f6-4efa810aa826fc1c-f7e6\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "4cabce1a8c76-4cb384c1f094d0ad-7c6c",
            "label": "Screen DPI",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"4cabce1a8c76-4cb384c1f094d0ad-7c6c\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "951e478742d0-47c5b544a6ee5f5f-7a76",
            "label": "Screen Height",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"951e478742d0-47c5b544a6ee5f5f-7a76\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "51f28068b5e1-4f669dc6956eae7c-7acf",
            "label": "Screen Width",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"51f28068b5e1-4f669dc6956eae7c-7acf\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "210aee1830e6-40f7adfecef36aa4-4454",
            "label": "Sentiment Analysis Score",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"210aee1830e6-40f7adfecef36aa4-4454\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "841fcc43f26b-4bc38ae0d53b7cd3-3549",
            "label": "Session Context",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": true,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"841fcc43f26b-4bc38ae0d53b7cd3-3549\",\"type\":\"VARIABLE\",\"variable_type\":\"DYNAMIC\",\"format\":\"\",\"non_audit\":true,\"field_path\":\"%%PATH%%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "eca9823a30d9-4c7e9758596b9c1a-32de",
            "label": "Session User Sentences",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"eca9823a30d9-4c7e9758596b9c1a-32de\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"COLLECTION\",\"format\":\"\",\"non_audit\":true}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "eca9823a30d9-4c7e9758596b9c1a-32de_elementAt",
            "label": "Session User Sentences.elementAt",
            "type": "FUNCTION",
            "description": "Get element from collection",
            "constant": false,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Index",
                    "description": "The index of the element",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "The element of the collection",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"eca9823a30d9-4c7e9758596b9c1a-32de\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"COLLECTION\",\"format\":\"\",\"non_audit\":true,\"index\":\"%INPUT_0%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "24bbaf8b62d9-45f88355a8240d9b-f02e",
            "label": "ShubhamTestVariable",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "OBJECT_Shusriv_Custom_Weather_Type",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"24bbaf8b62d9-45f88355a8240d9b-f02e\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "24bbaf8b62d9-45f88355a8240d9b-f02e:date",
            "label": "ShubhamTestVariable.date",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "DATE",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"24bbaf8b62d9-45f88355a8240d9b-f02e\",\"valueType\":\"DATE\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"date\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "24bbaf8b62d9-45f88355a8240d9b-f02e:id",
            "label": "ShubhamTestVariable.id",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"24bbaf8b62d9-45f88355a8240d9b-f02e\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"id\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "24bbaf8b62d9-45f88355a8240d9b-f02e:temperature",
            "label": "ShubhamTestVariable.temperature",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"24bbaf8b62d9-45f88355a8240d9b-f02e\",\"valueType\":\"NUMBER\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"temperature\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "24bbaf8b62d9-45f88355a8240d9b-f02e:unit",
            "label": "ShubhamTestVariable.unit",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"24bbaf8b62d9-45f88355a8240d9b-f02e\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"unit\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "defd10f742f6-4af68f68ffabbeb8-9dfb",
            "label": "Shufersal_VA_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_Shufersal_VA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"defd10f742f6-4af68f68ffabbeb8-9dfb\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "Shufersal_VA_Intents:ENUM_COMPARE.enum.ne",
            "label": "Shufersal_VA_Intents.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_Shufersal_VA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_Shufersal_VA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "Shufersal_VA_Intents:ENUM_COMPARE.enum.eq",
            "label": "Shufersal_VA_Intents.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_Shufersal_VA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_Shufersal_VA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_Shufersal_VA_Intents:No no",
            "label": "Shufersal_VA_Intents.No no",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_Shufersal_VA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_Shufersal_VA_Intents:No no\",\"valueType\":\"Shufersal_VA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"No no\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_Shufersal_VA_Intents:agent transfer",
            "label": "Shufersal_VA_Intents.agent transfer",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_Shufersal_VA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_Shufersal_VA_Intents:agent transfer\",\"valueType\":\"Shufersal_VA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"agent transfer\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_Shufersal_VA_Intents:employee details",
            "label": "Shufersal_VA_Intents.employee details",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_Shufersal_VA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_Shufersal_VA_Intents:employee details\",\"valueType\":\"Shufersal_VA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"employee details\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_Shufersal_VA_Intents:yes",
            "label": "Shufersal_VA_Intents.yes",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_Shufersal_VA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_Shufersal_VA_Intents:yes\",\"valueType\":\"Shufersal_VA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"yes\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "07fdb4a6c1db-410ba9c84e5782a2-ce03",
            "label": "Shusriv_VA_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_Shusriv_VA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"07fdb4a6c1db-410ba9c84e5782a2-ce03\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "Shusriv_VA_Intents:ENUM_COMPARE.enum.ne",
            "label": "Shusriv_VA_Intents.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_Shusriv_VA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_Shusriv_VA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "Shusriv_VA_Intents:ENUM_COMPARE.enum.eq",
            "label": "Shusriv_VA_Intents.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_Shusriv_VA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_Shusriv_VA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_Shusriv_VA_Intents:ShuSriv AgentTransfer Intent",
            "label": "Shusriv_VA_Intents.ShuSriv AgentTransfer Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_Shusriv_VA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_Shusriv_VA_Intents:ShuSriv AgentTransfer Intent\",\"valueType\":\"Shusriv_VA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"ShuSriv AgentTransfer Intent\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_Shusriv_VA_Intents:ShuSriv General Test Intent",
            "label": "Shusriv_VA_Intents.ShuSriv General Test Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_Shusriv_VA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_Shusriv_VA_Intents:ShuSriv General Test Intent\",\"valueType\":\"Shusriv_VA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"ShuSriv General Test Intent\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_Shusriv_VA_Intents:ShuSriv Global Intent",
            "label": "Shusriv_VA_Intents.ShuSriv Global Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_Shusriv_VA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_Shusriv_VA_Intents:ShuSriv Global Intent\",\"valueType\":\"Shusriv_VA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"ShuSriv Global Intent\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_Shusriv_VA_Intents:Test_Agent_Transfer",
            "label": "Shusriv_VA_Intents.Test_Agent_Transfer",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_Shusriv_VA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_Shusriv_VA_Intents:Test_Agent_Transfer\",\"valueType\":\"Shusriv_VA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Test_Agent_Transfer\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_Shusriv_VA_Intents:payment plan",
            "label": "Shusriv_VA_Intents.payment plan",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_Shusriv_VA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_Shusriv_VA_Intents:payment plan\",\"valueType\":\"Shusriv_VA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"payment plan\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "7a9ca6d5989d-46de8a76b6d4a92b-3b72",
            "label": "SourceTelephonyID",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"7a9ca6d5989d-46de8a76b6d4a92b-3b72\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "2ff1168458a9-4bb5b1f28da1736d-833b",
            "label": "Speed",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"2ff1168458a9-4bb5b1f28da1736d-833b\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "95e616a0042d-403898a636c70a7e-2d91",
            "label": "Target Telephony Queue",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"95e616a0042d-403898a636c70a7e-2d91\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "e239cc4259f6-4ae297677cf2ff8f-f85e",
            "label": "Technician ID",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"e239cc4259f6-4ae297677cf2ff8f-f85e\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "c0414f3b-ce7b-11ef-a235-2a04d12cb130",
            "label": "TestTool",
            "type": "INTEGRATION_POINT",
            "description": "use this tool when the Customer asks to know what the weather is like in their city",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "cityName",
                    "description": "This is the city for which the Customer wants to know the weather",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "main.temp",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                },
                {
                    "name": "main.feels_like",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"c0414f3b-ce7b-11ef-a235-2a04d12cb130\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.String.concat",
            "label": "Text.Concatenate",
            "type": "FUNCTION",
            "description": "Concatenates the text arguments and returns a new string result.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "str 1",
                    "description": "One or more strings to concatenate",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "str 2",
                    "description": "One or more strings to concatenate",
                    "required": true,
                    "repeats": true,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New combined string containing the texts provided",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.String.concat\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.String.includes",
            "label": "Text.Contains",
            "type": "FUNCTION",
            "description": "Searches (case-sensitive) the given text to determine whether the specified string is found.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text string to search",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Search String",
                    "description": "Case-sensitive string to search for in the given text",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the search string is found within the given string",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.String.includes\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.String.slice",
            "label": "Text.Cut",
            "type": "FUNCTION",
            "description": "Extracts the specified substring section from this text.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text to extract from",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "start",
                    "description": "Index number of the first character to include in the returned substring",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "end",
                    "description": "Index number of the first character to exclude from the returned substring.",
                    "required": false,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Extracted substring text",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.String.slice\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"},{\"value\":\"%INPUT_2%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "Text.Cut(\"The mirror\",5,9) will return \"mirr\"",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.text.notContains",
            "label": "Text.Does not contain",
            "type": "FUNCTION",
            "description": "Searches (case-sensitive) the given text to determine whether the specified string is not found.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text string to search",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Search String",
                    "description": "Case-sensitive string to search for in the given text",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the search string is not found within the given string",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.text.notContains\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.String.notEndsWith",
            "label": "Text.Does not end with",
            "type": "FUNCTION",
            "description": "Searches the given text to determine if it does not end with the specified string.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text string to search",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Search String",
                    "description": "String to locate at the text end",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the given text does not end with the specified string",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.String.notEndsWith\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.TEXT.ne",
            "label": "Text.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given texts to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text 1",
                    "description": "Compare text 1",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Text 2",
                    "description": "Compare text 2",
                    "required": true,
                    "repeats": true,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given texts are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.TEXT.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.String.notStartsWith",
            "label": "Text.Does not start with",
            "type": "FUNCTION",
            "description": "Searches the given text to determine if it does not start with the specified string.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text string to search",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Search String",
                    "description": "String to locate at the text start",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the given text does not start with the specified string",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.String.notStartsWith\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.String.endsWith",
            "label": "Text.Ends with",
            "type": "FUNCTION",
            "description": "Searches the given text to determine if it ends with the specified string.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text string to search",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Search String",
                    "description": "String to locate at the text end",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the given text ends with the specified string",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.String.endsWith\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "COMPARE.TEXT.eq",
            "label": "Text.Equals",
            "type": "FUNCTION",
            "description": "Compares two given texts to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text 1",
                    "description": "Compare text 1",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Text 2",
                    "description": "Compare text 2",
                    "required": true,
                    "repeats": true,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two numbers are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"COMPARE.TEXT.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.String.match",
            "label": "Text.Extract",
            "type": "FUNCTION",
            "description": "Searches the given string for text that matches the specified Regex pattern and returns the matched string portion(s) as a Collection.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "String",
                    "description": "String to search for match",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Regex",
                    "description": "Regex pattern to search for",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New Collection that contains all matching string portions",
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.String.match\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.String.empty",
            "label": "Text.Is empty",
            "type": "FUNCTION",
            "description": "Searches the given text to determine if it is an empty string.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text string to search",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the given text is an empty string",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.String.empty\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.String.notEmpty",
            "label": "Text.Is not empty",
            "type": "FUNCTION",
            "description": "Searches the given text to determine if it is not an empty string.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text string to search",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the given text is not an empty string",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.String.notEmpty\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.String.toLowerCase",
            "label": "Text.Lower",
            "type": "FUNCTION",
            "description": "Converts all characters in a text string to lowercase.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "String to apply lowercase",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Resulting lowercase string",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.String.toLowerCase\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "CUSTOM.text.match",
            "label": "Text.Match",
            "type": "FUNCTION",
            "description": "Indicates whether the specified Regex pattern returns a match in the given string.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "String",
                    "description": "String to search for match",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Regex",
                    "description": "Regex pattern to search for",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the searched Regex pattern is found within the given string",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"CUSTOM.text.match\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.String.padStart",
            "label": "Text.Pad left",
            "type": "FUNCTION",
            "description": "Pads a string from the left side up to the specified total length using the specified character(s).",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text to pad",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Length",
                    "description": "Final length of the resulting string",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "pad string",
                    "description": "String to pad with",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Resulting padded text",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.String.padStart\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"},{\"value\":\"%INPUT_2%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.String.padEnd",
            "label": "Text.Pad right",
            "type": "FUNCTION",
            "description": "Pads a string from the right side up to the specified total length using the specified character(s).",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text to pad",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Length",
                    "description": "Final length of the resulting string",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "pad string",
                    "description": "String to pad with",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Resulting padded text",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.String.padEnd\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"},{\"value\":\"%INPUT_2%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "PICK.text.pick",
            "label": "Text.Pick",
            "type": "FUNCTION",
            "description": "Retrieves the first given text if the picker is True; otherwise retrieves the second given text.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Picker",
                    "description": "Picker setting",
                    "required": true,
                    "repeats": false,
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Text 1",
                    "description": "First text to pick",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Text 2",
                    "description": "Second text to pick",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "First or second text content, according to picker setting",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"PICK.text.pick\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"},{\"value\":\"%INPUT_2%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.String.replaceAll",
            "label": "Text.Replace all",
            "type": "FUNCTION",
            "description": "Replaces all occurrences of one specified string with the another string.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Source text",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "pattern",
                    "description": "Pattern of the text to replace",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "replacement",
                    "description": "Replacement text",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Resulting text after string replacement",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.String.replaceAll\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"},{\"value\":\"%INPUT_2%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.String.split",
            "label": "Text.Split",
            "type": "FUNCTION",
            "description": "Uses the specified separator character to divide the given text into separate components and stores these in a unique Collection.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "String",
                    "description": "String to split",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Separator",
                    "description": "Separator character to indicate split",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "New Collection that contains all separated components",
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.String.split\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.String.startsWith",
            "label": "Text.Starts with",
            "type": "FUNCTION",
            "description": "Searches the given text to determine if it starts with the specified string.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text string to search",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Search String",
                    "description": "String to locate at the text start",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the given text starts with the specified string",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.String.startsWith\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.Number.parseFloat",
            "label": "Text.To number",
            "type": "FUNCTION",
            "description": "Converts text to a number.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text to be converted",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Resulting converted number",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.Number.parseFloat\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.String.trim",
            "label": "Text.Trim",
            "type": "FUNCTION",
            "description": "Removes whitespace from both ends of the specified string",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text to trim",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Resulting trimmed text",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.String.trim\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.String.trimStart",
            "label": "Text.Trim left",
            "type": "FUNCTION",
            "description": "Removes whitespace from the left side of the specified string.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text to trim",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Resulting left-trimmed text",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.String.trimStart\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.String.trimEnd",
            "label": "Text.Trim right",
            "type": "FUNCTION",
            "description": "Removes whitespace from the right side of the specified string.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "Text to trim",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Resulting right-trimmed text",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.String.trimEnd\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "NATIVE.String.toUpperCase",
            "label": "Text.Upper",
            "type": "FUNCTION",
            "description": "Converts all characters in a text string to uppercase.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Text",
                    "description": "String to apply uppercase",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Resulting uppercase string",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"NATIVE.String.toUpperCase\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "994b924f5b02-4ad48082896a7859-4f2c",
            "label": "Ticket ID",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"994b924f5b02-4ad48082896a7859-4f2c\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "07b6db2d69a9-4c9a9c1966f88ce1-1670",
            "label": "Ticket assignee",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"07b6db2d69a9-4c9a9c1966f88ce1-1670\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "cd2aeb6642f6-40ecbcbd54d17e4b-af17",
            "label": "Ticket priority",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"cd2aeb6642f6-40ecbcbd54d17e4b-af17\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "1dd606d8f205-4c69b7b719c1a80e-3022",
            "label": "Ticket subject",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"1dd606d8f205-4c69b7b719c1a80e-3022\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "d1adeb6738b1-436abc6d1a228f78-e177",
            "label": "Ticket submitter",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"d1adeb6738b1-436abc6d1a228f78-e177\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "f486cedc2784-47d68df7b0cd6199-0525",
            "label": "Time Stamp",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "DATE",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"f486cedc2784-47d68df7b0cd6199-0525\",\"type\":\"VARIABLE\",\"variable_type\":\"DATE\",\"format\":\"MM/dd/yyyy\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "e98cda58ab21-423082a94b18c2a7-0421",
            "label": "Time Zone",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"e98cda58ab21-423082a94b18c2a7-0421\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "712cc3c17103-4ea9aa7175f98092-c05a",
            "label": "USelfServe Authenticated",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"712cc3c17103-4ea9aa7175f98092-c05a\",\"type\":\"VARIABLE\",\"variable_type\":\"BOOLEAN\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ff1715e56b7a-47ba902f2aa7f1f8-6b94",
            "label": "USelfServe Containment",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ff1715e56b7a-47ba902f2aa7f1f8-6b94\",\"type\":\"VARIABLE\",\"variable_type\":\"BOOLEAN\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "4744aa9e0a83-4bc8aea7c73d48be-3cf0",
            "label": "User Input",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"4744aa9e0a83-4bc8aea7c73d48be-3cf0\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":true}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "fff6f18b54ab-43d7abbbe910c0bb-fbf4",
            "label": "UserID",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"fff6f18b54ab-43d7abbbe910c0bb-fbf4\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "221314b17153-47e881819aa19008-3e68",
            "label": "UserRoles",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "COLLECTION_ENUM_Roles",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"221314b17153-47e881819aa19008-3e68\",\"valueType\":\"ENUM\",\"type\":\"VARIABLE\",\"variable_type\":\"COLLECTION\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "221314b17153-47e881819aa19008-3e68_elementAt",
            "label": "UserRoles.elementAt",
            "type": "FUNCTION",
            "description": "Get element from collection",
            "constant": false,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Index",
                    "description": "The index of the element",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "The element of the collection",
                    "type": "ENUM",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"221314b17153-47e881819aa19008-3e68\",\"valueType\":\"ENUM\",\"type\":\"VARIABLE\",\"variable_type\":\"COLLECTION\",\"format\":\"\",\"non_audit\":false,\"index\":\"%INPUT_0%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "6b763cda1cd0-4ada8c901ff99128-512b",
            "label": "WIFI",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"6b763cda1cd0-4ada8c901ff99128-512b\",\"type\":\"VARIABLE\",\"variable_type\":\"BOOLEAN\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "0f124f0c-b125-11ef-aa15-b633480f5894",
            "label": "WebHook IP Params",
            "type": "INTEGRATION_POINT",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "requestBody",
                    "description": "",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "headeBool",
                    "description": "",
                    "required": true,
                    "repeats": false,
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "headerNum",
                    "description": "",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "headerText",
                    "description": "",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "repsonseBody",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"0f124f0c-b125-11ef-aa15-b633480f5894\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"},{\"value\":\"%INPUT_2%\"},{\"value\":\"%INPUT_3%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "4f2c14e509ba-49ed9258abab93ff-e9f8",
            "label": "XavierVA_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_XavierVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"4f2c14e509ba-49ed9258abab93ff-e9f8\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "XavierVA_Intents:ENUM_COMPARE.enum.ne",
            "label": "XavierVA_Intents.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_XavierVA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_XavierVA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "XavierVA_Intents:ENUM_COMPARE.enum.eq",
            "label": "XavierVA_Intents.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_XavierVA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_XavierVA_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_XavierVA_Intents:Shopping",
            "label": "XavierVA_Intents.Shopping",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_XavierVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_XavierVA_Intents:Shopping\",\"valueType\":\"XavierVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Shopping\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_XavierVA_Intents:car rental",
            "label": "XavierVA_Intents.car rental",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_XavierVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_XavierVA_Intents:car rental\",\"valueType\":\"XavierVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"car rental\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_XavierVA_Intents:hotel",
            "label": "XavierVA_Intents.hotel",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_XavierVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_XavierVA_Intents:hotel\",\"valueType\":\"XavierVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"hotel\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_XavierVA_Intents:plane ticket",
            "label": "XavierVA_Intents.plane ticket",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_XavierVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_XavierVA_Intents:plane ticket\",\"valueType\":\"XavierVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"plane ticket\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_XavierVA_Intents:trip",
            "label": "XavierVA_Intents.trip",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_XavierVA_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_XavierVA_Intents:trip\",\"valueType\":\"XavierVA_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"trip\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "d05eee6af1bd-410eb88f3b7446aa-6c24",
            "label": "accountId",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"d05eee6af1bd-410eb88f3b7446aa-6c24\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"######\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "c66303cc778a-44f28d24434f63ca-c256",
            "label": "accountType",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"c66303cc778a-44f28d24434f63ca-c256\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"######\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "771f1a1e18d4-45b38aa8e4bf6aee-1934",
            "label": "amount",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"771f1a1e18d4-45b38aa8e4bf6aee-1934\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"######\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "642d6641b0c6-48bbb4262327964e-50cc",
            "label": "balance",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"642d6641b0c6-48bbb4262327964e-50cc\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"######\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "97050191-d6f8-11ef-b78f-a624a9f7ae1d",
            "label": "car finance",
            "type": "INTEGRATION_POINT",
            "description": "car finance account",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "accountId",
                    "description": "finance account identifier",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                },
                {
                    "name": "amount",
                    "description": "finance amount",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                },
                {
                    "name": "emi",
                    "description": "finance emi",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"97050191-d6f8-11ef-b78f-a624a9f7ae1d\",\"inputs\":[],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "c0361d778477-46cca6a97d001f10-7872",
            "label": "chavitest_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"c0361d778477-46cca6a97d001f10-7872\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:Checkin",
            "label": "chavitest_Intents.Checkin",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:Checkin\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Checkin\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:DetectArabic",
            "label": "chavitest_Intents.DetectArabic",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:DetectArabic\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"DetectArabic\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:DistractIntent1",
            "label": "chavitest_Intents.DistractIntent1",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:DistractIntent1\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"DistractIntent1\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:DistractIntent3",
            "label": "chavitest_Intents.DistractIntent3",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:DistractIntent3\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"DistractIntent3\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:Distractintent2",
            "label": "chavitest_Intents.Distractintent2",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:Distractintent2\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Distractintent2\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "chavitest_Intents:ENUM_COMPARE.enum.ne",
            "label": "chavitest_Intents.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "chavitest_Intents:ENUM_COMPARE.enum.eq",
            "label": "chavitest_Intents.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:No_Intent",
            "label": "chavitest_Intents.No_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:No_Intent\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"No_Intent\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:Yes",
            "label": "chavitest_Intents.Yes",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:Yes\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Yes\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:agent_transfer",
            "label": "chavitest_Intents.agent_transfer",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:agent_transfer\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"agent_transfer\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:car_finance",
            "label": "chavitest_Intents.car_finance",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:car_finance\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"car_finance\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:car_reservation",
            "label": "chavitest_Intents.car_reservation",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:car_reservation\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"car_reservation\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:card balance",
            "label": "chavitest_Intents.card balance",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:card balance\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"card balance\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:claim_status",
            "label": "chavitest_Intents.claim_status",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:claim_status\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"claim_status\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:goodbye",
            "label": "chavitest_Intents.goodbye",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:goodbye\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"goodbye\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:interest_rate",
            "label": "chavitest_Intents.interest_rate",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:interest_rate\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"interest_rate\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:test3",
            "label": "chavitest_Intents.test3",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:test3\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"test3\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_chavitest_Intents:user details",
            "label": "chavitest_Intents.user details",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_chavitest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_chavitest_Intents:user details\",\"valueType\":\"chavitest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"user details\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "4521bd89258e-4c2a9617572b0c7f-371a",
            "label": "collection of boolean",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "COLLECTION_BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"4521bd89258e-4c2a9617572b0c7f-371a\",\"valueType\":\"BOOLEAN\",\"type\":\"VARIABLE\",\"variable_type\":\"COLLECTION\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "4521bd89258e-4c2a9617572b0c7f-371a_elementAt",
            "label": "collection of boolean.elementAt",
            "type": "FUNCTION",
            "description": "Get element from collection",
            "constant": false,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Index",
                    "description": "The index of the element",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "The element of the collection",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"4521bd89258e-4c2a9617572b0c7f-371a\",\"valueType\":\"BOOLEAN\",\"type\":\"VARIABLE\",\"variable_type\":\"COLLECTION\",\"format\":\"\",\"non_audit\":false,\"index\":\"%INPUT_0%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ddee9086e63c-4ee0a06c61c63a51-c348",
            "label": "collection of date",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "COLLECTION_DATE",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ddee9086e63c-4ee0a06c61c63a51-c348\",\"valueType\":\"DATE\",\"type\":\"VARIABLE\",\"variable_type\":\"COLLECTION\",\"format\":\"MM/dd/yyyy\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ddee9086e63c-4ee0a06c61c63a51-c348_elementAt",
            "label": "collection of date.elementAt",
            "type": "FUNCTION",
            "description": "Get element from collection",
            "constant": false,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Index",
                    "description": "The index of the element",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "The element of the collection",
                    "type": "DATE",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ddee9086e63c-4ee0a06c61c63a51-c348\",\"valueType\":\"DATE\",\"type\":\"VARIABLE\",\"variable_type\":\"COLLECTION\",\"format\":\"MM/dd/yyyy\",\"non_audit\":false,\"index\":\"%INPUT_0%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "8dcb47747699-4208ba0fbec064b7-48b3",
            "label": "danTestEnum",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_Promise Tracking Status",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"8dcb47747699-4208ba0fbec064b7-48b3\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "81684872-ac31-11ef-b2b0-1e8b6b57450d",
            "label": "dfsghgfhdfh",
            "type": "INTEGRATION_POINT",
            "description": "dfghdfgjretfjr",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "bookingRefNo",
                    "description": "bvxcvbnxcvnb",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "customerSSN",
                    "description": "xcvnbsgfdhnrsgf",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "zxcvbnbfxgn",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"81684872-ac31-11ef-b2b0-1e8b6b57450d\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "6027b6eb-b149-11ef-aa04-8a0b81708daf",
            "label": "dsfdsfdsf",
            "type": "INTEGRATION_POINT",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "accountId",
                    "description": "",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "balance",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"6027b6eb-b149-11ef-aa04-8a0b81708daf\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "4486e2a06324-4f4e938b65e6d5c5-924f",
            "label": "emi",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"4486e2a06324-4f4e938b65e6d5c5-924f\",\"type\":\"VARIABLE\",\"variable_type\":\"NUMBER\",\"format\":\"######\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342",
            "label": "gContact",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "OBJECT_Contact",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:assistant",
            "label": "gContact.assistant",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"assistant\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:assistant_phone",
            "label": "gContact.assistant_phone",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"assistant_phone\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:date_entered",
            "label": "gContact.date_entered",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "DATE",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"DATE\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"date_entered\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:date_modified",
            "label": "gContact.date_modified",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "DATE",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"DATE\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"date_modified\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:deleted",
            "label": "gContact.deleted",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"BOOLEAN\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"deleted\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:department",
            "label": "gContact.department",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"department\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:description",
            "label": "gContact.description",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"description\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:do_not_call",
            "label": "gContact.do_not_call",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"BOOLEAN\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"do_not_call\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:first_name",
            "label": "gContact.first_name",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"first_name\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:id",
            "label": "gContact.id",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "NUMBER",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"NUMBER\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"id\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:last_name",
            "label": "gContact.last_name",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"last_name\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:lead_source",
            "label": "gContact.lead_source",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"lead_source\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:linkedin",
            "label": "gContact.linkedin",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"linkedin\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:phone_home",
            "label": "gContact.phone_home",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"phone_home\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:phone_mobile",
            "label": "gContact.phone_mobile",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"phone_mobile\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:phone_work",
            "label": "gContact.phone_work",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"phone_work\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:primary_address_city",
            "label": "gContact.primary_address_city",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"primary_address_city\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:primary_address_country",
            "label": "gContact.primary_address_country",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"primary_address_country\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:primary_address_postalcode",
            "label": "gContact.primary_address_postalcode",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"primary_address_postalcode\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:primary_address_state",
            "label": "gContact.primary_address_state",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"primary_address_state\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:primary_address_street",
            "label": "gContact.primary_address_street",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"primary_address_street\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:salutation",
            "label": "gContact.salutation",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"salutation\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "04a2631d8668-44e8a3f01cfe26c0-d342:title",
            "label": "gContact.title",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"04a2631d8668-44e8a3f01cfe26c0-d342\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"OBJECT\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"title\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "dca7fb3508f8-4516a51504a052ee-b308",
            "label": "gautham_va_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_gautham_va_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"dca7fb3508f8-4516a51504a052ee-b308\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "gautham_va_Intents:ENUM_COMPARE.enum.ne",
            "label": "gautham_va_Intents.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_gautham_va_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_gautham_va_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "gautham_va_Intents:ENUM_COMPARE.enum.eq",
            "label": "gautham_va_Intents.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_gautham_va_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_gautham_va_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_gautham_va_Intents:interest_rate",
            "label": "gautham_va_Intents.interest_rate",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_gautham_va_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_gautham_va_Intents:interest_rate\",\"valueType\":\"gautham_va_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"interest_rate\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "917be877-b156-11ef-befd-3e8e3b1743c0",
            "label": "get manufacturer",
            "type": "INTEGRATION_POINT",
            "description": "3P Tool to get the Manufacturer",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "accountID",
                    "description": "",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "res",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"917be877-b156-11ef-befd-3e8e3b1743c0\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "8e41d144-b7aa-11ef-a5a1-f23e8de7032e",
            "label": "getPnrDetails",
            "type": "INTEGRATION_POINT",
            "description": "use this tool to fetch customer PNR details when trying to book a flight.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "bookingRefNo",
                    "description": "This is a ten digit number which is the booking reference number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "customerSSN",
                    "description": "customer social security number which is ten character long alphanumeric value",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "This is the booking PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"8e41d144-b7aa-11ef-a5a1-f23e8de7032e\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "73a614ba-ac2d-11ef-8cae-ca49faed0a7e",
            "label": "gsdfgsdfg",
            "type": "INTEGRATION_POINT",
            "description": "sdfgsdfg",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "bookingRefNo",
                    "description": "asgdfsg",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "customerSSN",
                    "description": "sdfgsdfg",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "dfgfzdcxysd",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"73a614ba-ac2d-11ef-8cae-ca49faed0a7e\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "a89a9919fd45-4816826a250d4b00-4375",
            "label": "hanatest2_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"a89a9919fd45-4816826a250d4b00-4375\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:Checkin",
            "label": "hanatest2_Intents.Checkin",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:Checkin\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Checkin\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:DetectArabic",
            "label": "hanatest2_Intents.DetectArabic",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:DetectArabic\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"DetectArabic\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:DistractIntent1",
            "label": "hanatest2_Intents.DistractIntent1",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:DistractIntent1\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"DistractIntent1\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:DistractIntent3",
            "label": "hanatest2_Intents.DistractIntent3",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:DistractIntent3\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"DistractIntent3\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:Distractintent2",
            "label": "hanatest2_Intents.Distractintent2",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:Distractintent2\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Distractintent2\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "hanatest2_Intents:ENUM_COMPARE.enum.ne",
            "label": "hanatest2_Intents.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "hanatest2_Intents:ENUM_COMPARE.enum.eq",
            "label": "hanatest2_Intents.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:No_Intent",
            "label": "hanatest2_Intents.No_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:No_Intent\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"No_Intent\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:Yes",
            "label": "hanatest2_Intents.Yes",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:Yes\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Yes\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:agent_transfer",
            "label": "hanatest2_Intents.agent_transfer",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:agent_transfer\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"agent_transfer\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:car_finance",
            "label": "hanatest2_Intents.car_finance",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:car_finance\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"car_finance\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:car_reservation",
            "label": "hanatest2_Intents.car_reservation",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:car_reservation\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"car_reservation\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:card balance",
            "label": "hanatest2_Intents.card balance",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:card balance\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"card balance\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:claim_status",
            "label": "hanatest2_Intents.claim_status",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:claim_status\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"claim_status\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:goodbye",
            "label": "hanatest2_Intents.goodbye",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:goodbye\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"goodbye\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:interest_rate",
            "label": "hanatest2_Intents.interest_rate",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:interest_rate\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"interest_rate\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:test3",
            "label": "hanatest2_Intents.test3",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:test3\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"test3\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_hanatest2_Intents:user details",
            "label": "hanatest2_Intents.user details",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_hanatest2_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_hanatest2_Intents:user details\",\"valueType\":\"hanatest2_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"user details\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "588fd5a42312-4947ae082adb7e5e-8168",
            "label": "haritest_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"588fd5a42312-4947ae082adb7e5e-8168\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:AccountBalance",
            "label": "haritest_Intents.AccountBalance",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:AccountBalance\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"AccountBalance\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:Checkin",
            "label": "haritest_Intents.Checkin",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:Checkin\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Checkin\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:DetectArabic",
            "label": "haritest_Intents.DetectArabic",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:DetectArabic\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"DetectArabic\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:DistractIntent1",
            "label": "haritest_Intents.DistractIntent1",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:DistractIntent1\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"DistractIntent1\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:DistractIntent3",
            "label": "haritest_Intents.DistractIntent3",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:DistractIntent3\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"DistractIntent3\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:Distractintent2",
            "label": "haritest_Intents.Distractintent2",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:Distractintent2\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Distractintent2\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "haritest_Intents:ENUM_COMPARE.enum.ne",
            "label": "haritest_Intents.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "haritest_Intents:ENUM_COMPARE.enum.eq",
            "label": "haritest_Intents.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:No_Intent",
            "label": "haritest_Intents.No_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:No_Intent\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"No_Intent\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:Yes",
            "label": "haritest_Intents.Yes",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:Yes\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Yes\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:agent_transfer",
            "label": "haritest_Intents.agent_transfer",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:agent_transfer\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"agent_transfer\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:car_finance",
            "label": "haritest_Intents.car_finance",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:car_finance\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"car_finance\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:car_reservation",
            "label": "haritest_Intents.car_reservation",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:car_reservation\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"car_reservation\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:card balance",
            "label": "haritest_Intents.card balance",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:card balance\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"card balance\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:claim_status",
            "label": "haritest_Intents.claim_status",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:claim_status\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"claim_status\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:goodbye",
            "label": "haritest_Intents.goodbye",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:goodbye\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"goodbye\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:interest_rate",
            "label": "haritest_Intents.interest_rate",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:interest_rate\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"interest_rate\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:test3",
            "label": "haritest_Intents.test3",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:test3\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"test3\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_haritest_Intents:user details",
            "label": "haritest_Intents.user details",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_haritest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_haritest_Intents:user details\",\"valueType\":\"haritest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"user details\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "3d08de3ae7cb-45d79ff287645a25-889a",
            "label": "historySearchId",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"3d08de3ae7cb-45d79ff287645a25-889a\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "92ed34172797-448399b5039999ac-651d",
            "label": "name",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"92ed34172797-448399b5039999ac-651d\",\"type\":\"VARIABLE\",\"variable_type\":\"TEXT\",\"format\":\"######\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ae9ce2d6c6b4-474d9061a7c572f5-5c12",
            "label": "nastiatest2511_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_nastiatest2511_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ae9ce2d6c6b4-474d9061a7c572f5-5c12\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "nastiatest2511_Intents:ENUM_COMPARE.enum.ne",
            "label": "nastiatest2511_Intents.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_nastiatest2511_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_nastiatest2511_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "nastiatest2511_Intents:ENUM_COMPARE.enum.eq",
            "label": "nastiatest2511_Intents.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_nastiatest2511_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_nastiatest2511_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest2511_Intents:card_id",
            "label": "nastiatest2511_Intents.card_id",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest2511_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest2511_Intents:card_id\",\"valueType\":\"nastiatest2511_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"card_id\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "125212bf551e-46c595c4a1e0719e-a131",
            "label": "nastiatest_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"125212bf551e-46c595c4a1e0719e-a131\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:Checkin",
            "label": "nastiatest_Intents.Checkin",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:Checkin\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Checkin\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:DetectArabic",
            "label": "nastiatest_Intents.DetectArabic",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:DetectArabic\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"DetectArabic\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:DistractIntent1",
            "label": "nastiatest_Intents.DistractIntent1",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:DistractIntent1\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"DistractIntent1\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:DistractIntent3",
            "label": "nastiatest_Intents.DistractIntent3",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:DistractIntent3\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"DistractIntent3\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:Distractintent2",
            "label": "nastiatest_Intents.Distractintent2",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:Distractintent2\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Distractintent2\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "nastiatest_Intents:ENUM_COMPARE.enum.ne",
            "label": "nastiatest_Intents.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "nastiatest_Intents:ENUM_COMPARE.enum.eq",
            "label": "nastiatest_Intents.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:No_Intent",
            "label": "nastiatest_Intents.No_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:No_Intent\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"No_Intent\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:Yes",
            "label": "nastiatest_Intents.Yes",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:Yes\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"Yes\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:agent_transfer",
            "label": "nastiatest_Intents.agent_transfer",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:agent_transfer\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"agent_transfer\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:car_finance",
            "label": "nastiatest_Intents.car_finance",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:car_finance\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"car_finance\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:car_reservation",
            "label": "nastiatest_Intents.car_reservation",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:car_reservation\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"car_reservation\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:card balance",
            "label": "nastiatest_Intents.card balance",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:card balance\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"card balance\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:claim_status",
            "label": "nastiatest_Intents.claim_status",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:claim_status\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"claim_status\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:goodbye",
            "label": "nastiatest_Intents.goodbye",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:goodbye\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"goodbye\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:interest_rate",
            "label": "nastiatest_Intents.interest_rate",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:interest_rate\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"interest_rate\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:test3",
            "label": "nastiatest_Intents.test3",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:test3\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"test3\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_nastiatest_Intents:user details",
            "label": "nastiatest_Intents.user details",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_nastiatest_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_nastiatest_Intents:user details\",\"valueType\":\"nastiatest_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"user details\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "7f172182ad27-48d3854b61a833c0-1cee",
            "label": "pasha collection",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "COLLECTION_TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"7f172182ad27-48d3854b61a833c0-1cee\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"COLLECTION\",\"format\":\"######\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "7f172182ad27-48d3854b61a833c0-1cee_elementAt",
            "label": "pasha collection.elementAt",
            "type": "FUNCTION",
            "description": "Get element from collection",
            "constant": false,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Index",
                    "description": "The index of the element",
                    "required": true,
                    "repeats": false,
                    "type": "NUMBER",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "The element of the collection",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"7f172182ad27-48d3854b61a833c0-1cee\",\"valueType\":\"TEXT\",\"type\":\"VARIABLE\",\"variable_type\":\"COLLECTION\",\"format\":\"######\",\"non_audit\":false,\"index\":\"%INPUT_0%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "76047792454d-40179e6814650e15-f322",
            "label": "pasha dynamic",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": true,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "DYNAMIC",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"76047792454d-40179e6814650e15-f322\",\"type\":\"VARIABLE\",\"variable_type\":\"DYNAMIC\",\"format\":\"\",\"non_audit\":false,\"field_path\":\"%%PATH%%\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "f626fb11-c8de-11ef-ba4b-c614680c6b40",
            "label": "test 3P tool 2",
            "type": "INTEGRATION_POINT",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "accountId",
                    "description": "safgdfsgsdfg",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "balance",
                    "description": "sdfgsdfgsdfgsdfg",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"f626fb11-c8de-11ef-ba4b-c614680c6b40\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "9324b2dd-b145-11ef-988d-ba5a64be1db6",
            "label": "test 3p integration tool",
            "type": "INTEGRATION_POINT",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "bookingRefNo",
                    "description": "",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "customerSSN",
                    "description": "",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"9324b2dd-b145-11ef-988d-ba5a64be1db6\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "98eabc64-ac92-11ef-8c45-729d0f7b1c4c",
            "label": "test 3p tool",
            "type": "INTEGRATION_POINT",
            "description": "gdfgsdsfg",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "accountId",
                    "description": "",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "balance",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"98eabc64-ac92-11ef-8c45-729d0f7b1c4c\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "2c3be051-c8e8-11ef-b2c7-360c5f8c6913",
            "label": "test IP 3",
            "type": "INTEGRATION_POINT",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "abcd",
                    "description": "",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "Result",
                    "description": "",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"2c3be051-c8e8-11ef-b2c7-360c5f8c6913\",\"inputs\":[{\"value\":\"%INPUT_0%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "26a88f20-abe4-11ef-b92f-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"26a88f20-abe4-11ef-b92f-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "dd95d92a-abe6-11ef-af5d-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"dd95d92a-abe6-11ef-af5d-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "dedbdadb-abe7-11ef-9334-9c2dcd3f0375",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"dedbdadb-abe7-11ef-9334-9c2dcd3f0375\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "dc010dee-abe7-11ef-9334-9c2dcd3f0375",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"dc010dee-abe7-11ef-9334-9c2dcd3f0375\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "6e6571f9-abe7-11ef-aba2-9c2dcd3f0375",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"6e6571f9-abe7-11ef-aba2-9c2dcd3f0375\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "6cae2bc6-abe7-11ef-aba2-9c2dcd3f0375",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"6cae2bc6-abe7-11ef-aba2-9c2dcd3f0375\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "6b74be49-abe7-11ef-aba2-9c2dcd3f0375",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"6b74be49-abe7-11ef-aba2-9c2dcd3f0375\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "688919d5-abe7-11ef-aba2-9c2dcd3f0375",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"688919d5-abe7-11ef-aba2-9c2dcd3f0375\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "f9a23bea-abe6-11ef-a652-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"f9a23bea-abe6-11ef-a652-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "f86e70fe-abe6-11ef-a652-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"f86e70fe-abe6-11ef-a652-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "dea1ab50-abe6-11ef-af5d-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"dea1ab50-abe6-11ef-af5d-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "dc60e7d4-abe6-11ef-af5d-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"dc60e7d4-abe6-11ef-af5d-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "6d8f23b0-abd8-11ef-be88-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"6d8f23b0-abd8-11ef-be88-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "7c94fb50-abd8-11ef-be88-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"7c94fb50-abd8-11ef-be88-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "64eddbd4-abdd-11ef-be88-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"64eddbd4-abdd-11ef-be88-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "24480dbe-abdf-11ef-8a7e-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"24480dbe-abdf-11ef-8a7e-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "4e925704-abe0-11ef-b39c-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"4e925704-abe0-11ef-b39c-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "7f595036-abe0-11ef-95f7-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"7f595036-abe0-11ef-95f7-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "027c6b9c-abe1-11ef-b11b-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"027c6b9c-abe1-11ef-b11b-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "071ddf18-abe2-11ef-b11b-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"071ddf18-abe2-11ef-b11b-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "d4ba3eb2-abe2-11ef-96cc-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"d4ba3eb2-abe2-11ef-96cc-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "752e3eac-abe3-11ef-b5f0-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"752e3eac-abe3-11ef-b5f0-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "89701ef8-abe3-11ef-9b04-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"89701ef8-abe3-11ef-9b04-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "003323be-abe4-11ef-bdd2-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"003323be-abe4-11ef-bdd2-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "477e2e56-abe6-11ef-873b-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"477e2e56-abe6-11ef-873b-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "05d29744-abe6-11ef-a3cc-1a4c47806046",
            "label": "test integration point tool",
            "type": "INTEGRATION_POINT",
            "description": "test integration point tool",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Booking ref number",
                    "description": "booking ref number",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Customer SSN",
                    "description": "customer ssn",
                    "required": true,
                    "repeats": false,
                    "type": "TEXT",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "PNR",
                    "description": "PNR",
                    "type": "TEXT",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"05d29744-abe6-11ef-a3cc-1a4c47806046\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "303533fd749e-47f58537ea7f765a-6c88",
            "label": "test8_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_test8_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"303533fd749e-47f58537ea7f765a-6c88\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "test8_Intents:ENUM_COMPARE.enum.ne",
            "label": "test8_Intents.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_test8_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_test8_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "test8_Intents:ENUM_COMPARE.enum.eq",
            "label": "test8_Intents.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_test8_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_test8_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_test8_Intents:No_intent",
            "label": "test8_Intents.No_intent",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_test8_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_test8_Intents:No_intent\",\"valueType\":\"test8_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"No_intent\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_test8_Intents:card_balance",
            "label": "test8_Intents.card_balance",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_test8_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_test8_Intents:card_balance\",\"valueType\":\"test8_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"card_balance\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_test8_Intents:user_details",
            "label": "test8_Intents.user_details",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_test8_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_test8_Intents:user_details\",\"valueType\":\"test8_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"user_details\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_test8_Intents:yes",
            "label": "test8_Intents.yes",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_test8_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_test8_Intents:yes\",\"valueType\":\"test8_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"yes\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ab6752572c46-41fdabf62a945152-9f7d",
            "label": "testVa_Intent",
            "type": "VARIABLE",
            "description": "",
            "constant": false,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "variable",
                    "type": "ENUM_testVa_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ab6752572c46-41fdabf62a945152-9f7d\",\"type\":\"VARIABLE\",\"variable_type\":\"ENUM\",\"format\":\"\",\"non_audit\":false}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "testVa_Intents:ENUM_COMPARE.enum.ne",
            "label": "testVa_Intents.Does not equal",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are not equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_testVa_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_testVa_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are not equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.ne\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "testVa_Intents:ENUM_COMPARE.enum.eq",
            "label": "testVa_Intents.Equals",
            "type": "FUNCTION",
            "description": "Compares two given enums to determine if they are equal.",
            "constant": true,
            "allowPath": false,
            "inputs": [
                {
                    "name": "Enum 1",
                    "description": "Compare enum 1",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_testVa_Intents",
                    "__typename": "AutoCompleteInputParameter"
                },
                {
                    "name": "Enum 2",
                    "description": "Compare enum 2",
                    "required": true,
                    "repeats": false,
                    "type": "ENUM_testVa_Intents",
                    "__typename": "AutoCompleteInputParameter"
                }
            ],
            "outputs": [
                {
                    "name": "output",
                    "description": "Returns True if the two given enums are equal",
                    "type": "BOOLEAN",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"actionId\":\"ENUM_COMPARE.enum.eq\",\"inputs\":[{\"value\":\"%INPUT_0%\"},{\"value\":\"%INPUT_1%\"}],\"outputs\":[{\"target\":\"%%OUTPUT_0%%\"}]}",
            "example": "",
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_testVa_Intents:agent transfer",
            "label": "testVa_Intents.agent transfer",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_testVa_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_testVa_Intents:agent transfer\",\"valueType\":\"testVa_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"agent transfer\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        },
        {
            "id": "ENUM_testVa_Intents:claim status",
            "label": "testVa_Intents.claim status",
            "type": "VARIABLE",
            "description": "",
            "constant": true,
            "allowPath": false,
            "inputs": [],
            "outputs": [
                {
                    "name": "output",
                    "description": "",
                    "type": "ENUM_testVa_Intents",
                    "__typename": "AutoCompleteOutputParameter"
                }
            ],
            "model": "{\"id\":\"ENUM_testVa_Intents:claim status\",\"valueType\":\"testVa_Intents\",\"type\":\"VALUE\",\"variable_type\":\"ENUM\",\"value\":\"claim status\"}",
            "example": null,
            "__typename": "AutoCompleteEntry"
        }
    ]
}