# n8n-nodes-ubuntufabric

This is an n8n community node. It lets you use UF in your n8n workflows.

UF (UbuntuFabric) is an all-in-one data platform with ELT, built-in data warehouse, data transformations and a data cockpit.

## Table of contents

- [Installation](#installation)  
- [Operations](#operations)  
- [Credentials](#credentials)  
- [Usage](#usage)  
- [Resources](#resources)  
- [Version history](#version-history)  


## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n documentation.  


## Operations

- **List tables** – Retrieve available tables  
- **Get data from table** – Query records from an UbuntuFabric table  
- **Run pipeline** – Trigger an existing pipeline  
- **Execute endpoint** – Call an API endpoint defined in UbuntuFabric  
- **Create SQL query** – Create a new SQL query in UbuntuFabric  
- **Execute SQL query** – Run a query against UbuntuFabric data warehouse  
- **Run script** – Execute a script stored in UbuntuFabric  
- **Get script logs** – Retrieve execution logs of a script  

## Credentials

1. Log in into UF.  
2. Go to **Settings → API Token**.  
3. Copy your API Token.  
4. In n8n, go to **Credentials → New → UF API** and paste your Token.  

## Usage

Visit https://ubuntufabric.io for more info.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* https://ubuntufabric.io

## Version history

- **May 2025** – `v0.0.1` initial implementation  
- **June 2025** – `v0.0.3` add table list operation  
- **June 2025** – `v0.0.4` enable tool usage of node  
- **September 2025** – `v0.0.5` UX fixes and code overhaul
- **October 2025** – `v0.0.6` replace deprecated functions
