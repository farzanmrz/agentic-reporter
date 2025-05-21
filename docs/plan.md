## **Project Plan: AI-Powered Inventory Reporting System**

Document Version: 1.0

Last Updated: May 20, 2025

### **1. Project Overview: AI-Powered Inventory Reporting System**

#### **1.1. Core Concept**

The project aims to develop an intelligent system that automates inventory report analysis and notification. Users will upload spreadsheet-based inventory reports (e.g., Excel, CSV). The system, driven by an AI agent, will parse these reports, apply user-defined filtering logic, and automatically send email notifications when specific data thresholds are met (e.g., when a product's "week cover" drops below a certain value).

#### **1.2. Key Features**

- **File Upload:** Support for .xlsx, .xls, and .csv spreadsheet formats.

- **Custom Reporting Templates:** Users can define multiple templates, specifying:

- Target sheet (by name or number).

- Header row location.

- One or more "monitor columns" (e.g., "Week Cover").

- Comparison logic for monitor columns (e.g., <, <=, >, >=, ==, != against a numeric value).

- A list of "report columns" to include in notifications (e.g., "Product Name," "Week Cover").

- Recipient email addresses.

- **Automated Processing & Filtering:**

- Verification of file, sheet, and specified column existence.

- Extraction of relevant data into a structured format (pandas DataFrame).

- Dynamic application of filtering logic based on the template.

- **AI-Driven Email Generation:** An AI agent will be responsible for drafting and sending email notifications containing the filtered report data (likely in Markdown format).

- **Configuration Management:** Users will be able to configure SMTP credentials for email sending, which will be securely stored.

#### **1.3. Intended Workflow**

1. **User Configuration:** User sets up SMTP credentials and creates reporting templates via a web interface.

2. **File Upload:** User uploads an inventory spreadsheet.

3. **Template Selection:** User selects a pre-defined template to apply to the uploaded file.

4. **Backend Processing (Agent Orchestration):**

- The system (orchestrated by an AI agent) validates the file against the template (sheet, header, columns).

- Relevant data is parsed.

- Filtering logic from the template is applied.

- The resulting data is prepared for the report.

- **Email Notification:** An AI agent drafts an email with the report and sends it to the specified recipients if the filtering conditions are met.

### **2. Proposed Technology Stack**

- **Frontend:** Angular (for a responsive and dynamic user interface).

- **Backend (Application & API):**

- **User Management & Core Web App Logic:** Laravel (PHP framework) for login, authentication, and managing user-defined templates.

- **AI & Data Processing API:** Python with FastAPI (for exposing AI agent logic and spreadsheet processing tasks as high-performance API endpoints).

- **AI & Agent Logic:**

- **Core Data Manipulation:** Python with Pandas (for spreadsheet parsing and manipulation).

- **Excel File Interaction (Low-Level):** Openpyxl (for .xlsx file operations).

- **Agent Framework:** Hugging Face Smol-Agents (specifically exploring ReAct paradigm and potentially CodeAgent for dynamic code generation/execution for filtering).

- **LLM Interaction:** Models accessible via Ollama (for local development/testing) or a serverless API setup like Cloud Run on GCP (for production).

- **Databases:**

- **Relational Data:** PostgreSQL or MySQL (managed by Laravel for user accounts, template metadata).

- **Service Configurations/Flexible Data:** MongoDB (for storing potentially complex service configurations or evolving template structures).

- **Deployment:** Google Cloud Platform (GCP)

- FastAPI services: Cloud Run.

- Laravel application: Cloud Run, App Engine, or GKE.

- Databases: Cloud SQL, Managed MongoDB (e.g., MongoDB Atlas on GCP).

### **3. Overall Development Plan (Path to Full System)**

- **Phase 1: Proof-of-Concept (AI Core & Basic Parsing - Current Focus)**

- Develop core Python functions for XLSX file verification (sheet, header, columns).

- Implement logic to parse relevant data from XLSX files into pandas DataFrames.

- Integrate a Smol-Agent to orchestrate verification, parsing, and dynamic data filtering based on predefined criteria.

- **Phase 2: API Development (FastAPI)**

- Wrap PoC Python logic into FastAPI endpoints.

- Define API contracts for file upload, template application, and report generation.

- **Phase 3: Backend Services (Laravel)**

- Set up user authentication and management.

- Develop models and APIs for creating, storing, and managing reporting templates and SMTP configurations.

- **Phase 4: Frontend Development (Angular)**

- Build UI for file upload, template creation/management, SMTP configuration, and displaying results/status.

- **Phase 5: Full Integration, Emailing & Deployment**

- Integrate frontend with Laravel and FastAPI services.

- Implement robust email generation (potentially AI-assisted drafting) and sending.

- Containerize applications and deploy to GCP.

- Testing, refinement, and monitoring.

### **4. Proof-of-Concept (PoC) Details**

#### **4.1. PoC Goal**

To demonstrate the core capability of an AI agent to:

1. Verify an uploaded XLSX spreadsheet against user-defined parameters (sheet, header row, monitor/report columns).

2. Parse only the relevant columns from the verified sheet.

3. Dynamically apply filtering logic to the parsed data using AI-generated code (via Smol-Agents CodeAgent).

4. Return the filtered dataset.

#### **4.2. PoC Scope (Initial Focus)**

- **File Type:** Exclusively .xlsx files for initial simplicity.

- **Agent:** Single Smol-Agent using the ReAct paradigm.

- **Core Logic:** Python scripts and functions, tested within a Jupyter Notebook (poc.ipynb).

- **Output:** A pandas DataFrame representing the filtered data. Emailing is out of scope for the initial PoC.

#### **4.3. Key PoC Steps**

1. **Tool Development - Verification:** Create a Python function (verify_xlsx) that validates the XLSX file, target sheet, header row, and existence of specified monitor/report columns. It should return confirmed header names and their original column indices.

2. **Tool Development - Data Parsing:** Create a Python function (parse_relevant_xlsx_data) that takes the verified information (including specific column indices to parse) and returns a pandas DataFrame containing only those columns.

3. **Agent Integration:**

- Wrap the verification and parsing functions as "tools" for a Smol-Agent.

- Configure the agent (e.g., CodeAgent or a ReAct agent) with these tools.

- Develop a prompt that instructs the agent to use these tools sequentially and then apply a filter (e.g., "WEEK COVER < 12") to the parsed DataFrame by generating the necessary pandas code.

### **5. Current Progress (As of May 20, 2025)**

#### **5.1. Project Setup**

- A project directory named agentic-reporter has been established.

- Key subdirectories include:

- data/: For test spreadsheet files (e.g., week_cover1.xlsx - Sheet1.csv - though for PoC, an actual .xlsx file is being used for openpyxl).

- utils/: For utility Python scripts. Contains parseutil.py (an older utility) and testutil.py (intended for new PoC-specific utilities, though current development is directly in poc.ipynb or a similar script).

- runscr/: Contains poc.ipynb, the Jupyter Notebook for developing and testing PoC components.

- An env.yml suggests a Conda environment for managing dependencies.

#### **5.2. Core Verification Logic (Function: verify_and_extract_xlsx_headers or similar)**

- **Location:** Currently being developed/refined (as discussed, likely within a Python script callable by poc.ipynb, or directly within poc.ipynb for initial testing).

- **Current Capabilities (based on recent discussions):**

1. **File Loading:** Successfully loads an .xlsx workbook using openpyxl.load_workbook(file_path, data_only=True). Handles FileNotFoundError and other loading exceptions.

2. **Sheet Validation:**

- Takes a 1-based sheet_number_1_based as input.

- Verifies if sheet_number_1_based is within the valid range of actual sheets in the workbook.

- Accesses the target sheet using the converted 0-based index (workbook.worksheets[sheet_number_1_based - 1]).

- **Header Row Access & Extraction:**

- Takes a 0-based header_row_0_based as input.

- Converts this to a 1-based row number for openpyxl.

- Validates if header_row_0_based is within the bounds of the target_sheet.max_row.

- Uses target_sheet.iter_rows() to iterate over the cells in the specified header row.

- Extracts the .value from each cell in that row.

- Returns a list of these raw extracted header cell values (e.g., ['S. NO.', 'Style Name', None, 'WEEK COVER']).

- **Normalization (Next immediate step for this function):** The extracted raw header values need to be normalized (e.g., [str(h).lower().strip() if h is not None else '' for h in raw_headers]).

- **Status:** The function can load a workbook, validate the sheet, and extract the raw values from the specified header row. The next step for this function is to normalize these headers and then compare them against the user-provided MONITOR_COLS and REPORT_COLS to determine which are present and their original indices.

#### **5.3. PoC Notebook (runscr/poc.ipynb)**

- **Purpose:** Serves as the interactive environment for developing, testing, and driving the PoC.

- **Current Use:**

- Defining test parameters (file paths, sheet numbers, header row indices, lists of monitor/report columns).

- Calling the verify_and_extract_xlsx_headers function with these parameters.

- Printing and inspecting the dictionary returned by the verification function to check its status and the extracted headers.

### **6. Immediate Next Steps for PoC**

1. **Finalize verify_and_extract_xlsx_headers (or equivalent name) Function:**

- **Normalize Extracted Headers:** Implement the logic: normalized_headers = [str(h).lower().strip() if h is not None else '' for h in raw_extracted_headers].

- **Compare with User Columns:**

- Normalize the input MONITOR_COLS and REPORT_COLS in the same way.

- Iterate through the normalized_headers (keeping track of their original 0-based indices).

- Identify which of the (normalized) user-specified MONITOR_COLS and REPORT_COLS are present in the normalized_headers.

- Store the original names (from the file) and original 0-based indices of the found columns.

- **Return Comprehensive Status:** The function should return a dictionary like: \
{ \
  "status": "success_or_error", \
  "message": "Details of success or error", \
  "verified_monitor_columns": [ \
    {"name_in_file": "WEEK COVER", "original_index": 14, "requested_name": "week cover"} \
  ], \
  "missing_monitor_columns": ["rate of sale/week"], \
  "verified_report_columns": [ \
    {"name_in_file": "S. NO.", "original_index": 0, "requested_name": "s.no."}, \
    {"name_in_file": "Style Name", "original_index": 2, "requested_name": "style name"} \
  ], \
  "missing_report_columns": [], \
  "all_actual_headers_normalized": ["s. no.", "images", "style name", ...] \
} \


- **Develop parse_relevant_xlsx_data_tool Python Function:**

- **Inputs:**

- file_path (string)

- sheet_name_or_index (string or int, as validated by the previous step)

- header_row_0_based (int, the 0-based index of the header row)

- column_indices_to_parse (list of ints, e.g., [0, 2, 14] from the original_index fields of the verified_monitor_columns and verified_report_columns output of the verification tool).

- (Optional) column_names_to_assign (list of strings, to rename columns in the resulting DataFrame if desired, e.g., using the user's requested normalized names).

- **Logic:**

- Use pandas.read_excel():

- io=file_path

- sheet_name=sheet_name_or_index

- header=header_row_0_based (Pandas uses this to identify the header row)

- usecols=column_indices_to_parse (This is key for only reading relevant data)

- If column_names_to_assign is provided, ensure the DataFrame columns are set to these names.

- **Output:** A pandas DataFrame containing only the data from the specified columns.

- **Error Handling:** Manage potential errors during parsing.

- **Integrate with Smol-Agent (ReAct Paradigm):**

- **Wrap as Tools:** Convert the finalized verify_and_extract_xlsx_headers and the new parse_relevant_xlsx_data_tool into functions that can be registered as tools with a Smol-Agent. This involves clear docstrings explaining their purpose, arguments, and return values.

- **Agent Setup:** Instantiate a Smol-Agent (e.g., CodeAgent if suitable, or a general ReAct agent).

- **Prompt Engineering:** Craft a detailed prompt for the agent:

- Define its overall goal (process XLSX, filter data).

- List available tools and their descriptions.

- Provide the specific inputs: file path, sheet/header info, monitor columns (e.g., ['WEEK COVER', 'RATE OF SALE/WEEK']), report columns (e.g., ['s.no.', 'style name']), and the filter criteria (e.g., "Filter on 'WEEK COVER' where value is less than 12").

- **Agent Execution:** Run the agent. It should:

1. Call the verification tool.

2. Based on the result, call the parsing tool with the correct column indices.

3. Receive the DataFrame.

4. **Filtering Step (Code Generation):** The agent (if it's a CodeAgent or has access to a Python execution tool) should then generate and execute the pandas filtering code (e.g., df[df['week cover'] < 12]). The column name for filtering ('week cover') should be derived from the (normalized) monitor column specified in the filter criteria.

5. Return the final filtered DataFrame.

### **7. Future Steps (Post-PoC)**

- **Expand File Type Support:** Adapt verification and parsing logic for .csv and .xls files.

- **API Development (FastAPI):** Expose the agent's capabilities through robust API endpoints.

- **Laravel Backend:** Build user authentication, template management (CRUD for templates, storing filter logic, column choices, recipients), and SMTP configuration storage.

- **Angular Frontend:** Develop the user interface for all user interactions.

- **Emailing Module:** Implement reliable email generation (potentially using the AI for drafting based on the filtered data) and sending via SMTP.

- **Full System Integration:** Connect all components.

- **Deployment & Scaling:** Containerize and deploy to GCP, setting up databases and infrastructure.

- **Advanced Features:** Consider more complex filtering logic, multi-file processing, scheduling, etc.

This detailed plan should provide clarity for your team on the project's vision, current status, and the path forward.
