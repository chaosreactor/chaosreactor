# System Objects
This document defines the features and entities within the Chaos Reactor product domain. This will determine how we build, market, and discuss the product. The system and this document will evolve over time.

## Reactor 
A reactor is a graphical representation of connected prompts and transformations that perform an action.

- Reactor Playfield - area of the product where users build, experiment, and collaborate on flows that contain building blocks to interact with AI systems and data. 
-   Node - an operation that can be added to a reactor. Node attributes:
    -   Name
    -   Input type - format content is input as
    -   Prompt - natural language instructions
    -   Output type - format content should be output as
    -   Pre-training sources
    -   variants
    -   Node Type:
	    - LLM Nodes
	        - Generator - generates content
	        - Ideator - creates ideas for something
	        - Classifier - groups things together
	        - Extrapolator - expands areas of content
	        - Re-organizer - reorganizes content
		*   Operators - control flow of data between nodes in a reactor. Check out the operators in Make ([Flow control](https://share.voxable.io/6quGZ58p), [Tool](https://share.voxable.io/xQuxqWzr)[s](https://share.voxable.io/yAuQK2K7), [Text parser](https://share.voxable.io/2Nu7zXzq))
			* Flow Control
				* Filter 
				* Router
				* Repeater
				* Iterator
				* Array aggregator
				* Rollback
				* Break
				* Resume
				* Commit
				* Ignore
			* Tools
				* Basic Trigger
				* Increment function
				* Sleep
				* Get variable
				* Set variable
				* Get multiple variables
				* Set multiple variables
				* Table aggregator
				* Text aggregator
				* Numeric aggregator
				* Compose string
				* Convert text encoding
				* Switch
		* Process or Workflow  - adding process or stopping point to the reactor
		* Reactor - Reactors can be referenced in other reactors and we'll show the starting inputs and ending outputs and can only be connected to matching input and output types.
		* Data Source - starting piece of content that the AI will be working with.
-   Pre-training data - source data the user connects to their workspace
    -   Building integrations
	    - URL or set of URLs
	    - Spreadsheet - upload csv
	    - SQL
	    - Base10 is good inspiration because they have
-   Workspace, Lab, Home - container for reactors, data sources, and everthing else a user can interact with and create. 