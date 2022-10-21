# System Objects
This document defines the entities within the Chaos Reactor product domain. These definitions determine how we build, market, and discuss the product. The system and this document will evolve over time.

## Reactor 
A reactor is a graphical representation of connected prompts and transformations that perform an action.

* Reactor Playfield - area of the product where users build, experiment, and collaborate on AI workflows that contain blocks that interact with data and AI providers. 

## Blocks
A block is an operation that can be added to a reactor. Block attributes:
	* Name - the title the user gives to the block 
    * Input - the content being transformed by the block  
    * Prompt - natural language instructions created by the user
	* Model controls - unique fields and properties that a model can receive aside from the prompt text
    * Output - the block's target output format (Text, Image, or Code) based on the model type (see table below).
    * Pre-training sources
    * Variants - how many variants are generated. The default is one.
    * Block Type
### LLM Blocks
* 💥 Generator - generate content
* 💡 Ideator - create ideas
* 🎯 Classifier - identify and categorize content
* 📝 Extrapolator - expand content ideas or sections
* 🔀 Reorganizer - transform content from one type to another
* 🔎 Searcher - search for content
* ✨ Editor - stylize and clean up content  
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

## AI Providers
AI providers are organizations that build large language and other AI models. Chaos Reactor is targeting [Open AI](https://beta.openai.com/docs/models) and [Stability AI](https://github.com/huggingface/diffusers/tree/main/src/diffusers/pipelines#pipelines-summary) as initial model integrations.

| Model Name			| Model Version		| Model        		| Provider    		| Type		   		| Description  		|
| ----------- 			| ----------- 		| ----------- 		| ----------- 		| ----------- 		| ----------- 		|
| Davinci 2				| text-davinci-002	| GPT-3				| Open AI     		| Text				| 					|
| Curie 1				| text-curie-001	| GPT-3				| Open AI     		| Text				| 					|
| Babbage 1				| text-babbage-001	| GPT-3				| Open AI     		| Text 				| 					|
| Ada 1					| text-ada-001		| GPT-3				| Open AI     		| Text				| 					|
| Cushman 1				| code-cushman-001	| Codex       		| Open AI     		| Code				| 					|
| Davinci				| code-davinci-002	| Codex       		| Open AI     		| Code				| 					|
| Latent Text-to-Image	| Text-to-Image		| Stable Diffusion	| Stability AI 		| Image				| 					|
| Stable Text-to-Image	| Text-to-Image		| Latent Diffusion	| Stability AI 		| Image				| 					|
| Image-to-Image		| Image-to-Image	| Stable Diffusion	| Stability AI 		| Image				| 					|
| Inpainting			| Inpainting		| Stable Diffusion	| Stability AI 		| Image				| 					|