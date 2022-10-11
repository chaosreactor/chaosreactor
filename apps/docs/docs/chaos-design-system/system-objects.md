# System Objects
This document defines the entities within the Chaos Reactor product domain. These definitions determine how we build, market, and discuss the product. The system and this document will evolve over time.

## Reactor 
A reactor is a graphical representation of connected prompts and transformations that perform an action.

* Reactor Playfield - area of the product where users build, experiment, and collaborate on AI workflows that contain blocks that interact with data and AI providers. 
* Block - an operation that can be added to a reactor. Node attributes:
	* Name
    * Input type - format content is input as
    * Prompt - natural language instructions
    * Output type - format content should be output as
    * Pre-training sources
    * Variants - how many variants are generated. The default is one.
    * Block Type
## Blocks
### LLM Blocks
* Generator - generates content
* Ideator - creates ideas for something
* Classifier - groups things together
* Extrapolator - expands areas of content
* Re-organizer - reorganizes content
### Basic Blocks
* Operators - control flow of data between nodes in a reactor. Check out the operators in Make ([Flow control](https://share.voxable.io/6quGZ58p), [Tool](https://share.voxable.io/xQuxqWzr)[s](https://share.voxable.io/yAuQK2K7), [Text parser](https://share.voxable.io/2Nu7zXzq))
* Flow Control
	* Filter 
	* Route
	* Repeate
	* Iterate
	* Aggregate Array
	* Rollback
	* Break
	* Resume
	* Commit
	* Ignore
* Process or Workflow  - adding process or stopping point to the reactor

	* Basic trigger
	* Increment function
	* Sleep
	* Get variable
	* Set variable
	* Get multiple variables
	* Set multiple variables
	* Aggregate table
	* Aggregate text
	* Aggregate number
	* Compose string
	* Convert text encoding
	* Switch
### Reference Blocks
* Reactor - Reactors can be referenced in other Reactors. A Reactor's starting inputs and ending outputs can only be connected to matching input and output types.
* Data Source - starting piece of content that the AI will be modifying.
## Pre-Training
Pre-training data - source data the user connects to their workspace. AI models will use this data to inform their outputs.
* Building integrations
* URL or set of URLs
* Spreadsheet - upload csv
* SQL

## Library 
The Library is container for reactors, data sources, and everthing else a user can interact with and create. 