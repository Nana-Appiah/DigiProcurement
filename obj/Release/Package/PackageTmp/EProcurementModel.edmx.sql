
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 05/30/2022 14:42:58
-- Generated from EDMX file: C:\Users\ofosu\OneDrive\Documents\Projects\DigiProc\EProcurementModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [eProcurementDb];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_CommitteeMember_Committee]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CommitteeMember] DROP CONSTRAINT [FK_CommitteeMember_Committee];
GO
IF OBJECT_ID(N'[dbo].[FK_CommitteeMember_Position]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CommitteeMember] DROP CONSTRAINT [FK_CommitteeMember_Position];
GO
IF OBJECT_ID(N'[dbo].[FK_Item_ItemCategory]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Item] DROP CONSTRAINT [FK_Item_ItemCategory];
GO
IF OBJECT_ID(N'[dbo].[FK_Item_SIUnit]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Item] DROP CONSTRAINT [FK_Item_SIUnit];
GO
IF OBJECT_ID(N'[dbo].[FK_PFNotificationList_NotificationGroup]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PFNotificationList] DROP CONSTRAINT [FK_PFNotificationList_NotificationGroup];
GO
IF OBJECT_ID(N'[dbo].[FK_PFNotificationList_ProcessFlow]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PFNotificationList] DROP CONSTRAINT [FK_PFNotificationList_ProcessFlow];
GO
IF OBJECT_ID(N'[dbo].[FK_ProcessFlow_ProcurementType]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ProcessFlow] DROP CONSTRAINT [FK_ProcessFlow_ProcurementType];
GO
IF OBJECT_ID(N'[dbo].[FK_Requisition_Company]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Requisition] DROP CONSTRAINT [FK_Requisition_Company];
GO
IF OBJECT_ID(N'[dbo].[FK_Requisition_Currency]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Requisition] DROP CONSTRAINT [FK_Requisition_Currency];
GO
IF OBJECT_ID(N'[dbo].[FK_Requisition_Department]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Requisition] DROP CONSTRAINT [FK_Requisition_Department];
GO
IF OBJECT_ID(N'[dbo].[FK_Requisition_FinancialYear]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Requisition] DROP CONSTRAINT [FK_Requisition_FinancialYear];
GO
IF OBJECT_ID(N'[dbo].[FK_Requisition_PriorityType]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Requisition] DROP CONSTRAINT [FK_Requisition_PriorityType];
GO
IF OBJECT_ID(N'[dbo].[FK_Requisition_RequisitionStatus]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Requisition] DROP CONSTRAINT [FK_Requisition_RequisitionStatus];
GO
IF OBJECT_ID(N'[dbo].[FK_Requisition_RequisitionType]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Requisition] DROP CONSTRAINT [FK_Requisition_RequisitionType];
GO
IF OBJECT_ID(N'[dbo].[FK_RequisitionItem_LPO]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[RequisitionItem] DROP CONSTRAINT [FK_RequisitionItem_LPO];
GO
IF OBJECT_ID(N'[dbo].[FK_UserModule_Module]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserModule] DROP CONSTRAINT [FK_UserModule_Module];
GO
IF OBJECT_ID(N'[dbo].[FK_Usr_Department]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Usr] DROP CONSTRAINT [FK_Usr_Department];
GO
IF OBJECT_ID(N'[dbo].[FK_Vendor_BusinessType]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Vendor] DROP CONSTRAINT [FK_Vendor_BusinessType];
GO
IF OBJECT_ID(N'[dbo].[FK_Vendor_VendorType]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Vendor] DROP CONSTRAINT [FK_Vendor_VendorType];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[AlternativeCapex]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AlternativeCapex];
GO
IF OBJECT_ID(N'[dbo].[BusinessType]', 'U') IS NOT NULL
    DROP TABLE [dbo].[BusinessType];
GO
IF OBJECT_ID(N'[dbo].[Capex]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Capex];
GO
IF OBJECT_ID(N'[dbo].[Cfg]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Cfg];
GO
IF OBJECT_ID(N'[dbo].[Committee]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Committee];
GO
IF OBJECT_ID(N'[dbo].[CommitteeMember]', 'U') IS NOT NULL
    DROP TABLE [dbo].[CommitteeMember];
GO
IF OBJECT_ID(N'[dbo].[Company]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Company];
GO
IF OBJECT_ID(N'[dbo].[Currency]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Currency];
GO
IF OBJECT_ID(N'[dbo].[Department]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Department];
GO
IF OBJECT_ID(N'[dbo].[FinancialYear]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FinancialYear];
GO
IF OBJECT_ID(N'[dbo].[Item]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Item];
GO
IF OBJECT_ID(N'[dbo].[ItemCategory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ItemCategory];
GO
IF OBJECT_ID(N'[dbo].[Logger]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Logger];
GO
IF OBJECT_ID(N'[dbo].[LPO]', 'U') IS NOT NULL
    DROP TABLE [dbo].[LPO];
GO
IF OBJECT_ID(N'[dbo].[LPOApproval]', 'U') IS NOT NULL
    DROP TABLE [dbo].[LPOApproval];
GO
IF OBJECT_ID(N'[dbo].[Module]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Module];
GO
IF OBJECT_ID(N'[dbo].[NotificationGroup]', 'U') IS NOT NULL
    DROP TABLE [dbo].[NotificationGroup];
GO
IF OBJECT_ID(N'[dbo].[NotificationList]', 'U') IS NOT NULL
    DROP TABLE [dbo].[NotificationList];
GO
IF OBJECT_ID(N'[dbo].[PFNotificationList]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PFNotificationList];
GO
IF OBJECT_ID(N'[dbo].[Position]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Position];
GO
IF OBJECT_ID(N'[dbo].[PriorityType]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PriorityType];
GO
IF OBJECT_ID(N'[dbo].[ProcessFlow]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ProcessFlow];
GO
IF OBJECT_ID(N'[dbo].[ProcessFlowList]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ProcessFlowList];
GO
IF OBJECT_ID(N'[dbo].[ProcurementType]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ProcurementType];
GO
IF OBJECT_ID(N'[dbo].[Profile]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Profile];
GO
IF OBJECT_ID(N'[dbo].[Requisition]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Requisition];
GO
IF OBJECT_ID(N'[dbo].[RequisitionFile]', 'U') IS NOT NULL
    DROP TABLE [dbo].[RequisitionFile];
GO
IF OBJECT_ID(N'[dbo].[RequisitionItem]', 'U') IS NOT NULL
    DROP TABLE [dbo].[RequisitionItem];
GO
IF OBJECT_ID(N'[dbo].[RequisitionStatus]', 'U') IS NOT NULL
    DROP TABLE [dbo].[RequisitionStatus];
GO
IF OBJECT_ID(N'[dbo].[RequisitionType]', 'U') IS NOT NULL
    DROP TABLE [dbo].[RequisitionType];
GO
IF OBJECT_ID(N'[dbo].[SIUnit]', 'U') IS NOT NULL
    DROP TABLE [dbo].[SIUnit];
GO
IF OBJECT_ID(N'[dbo].[sysdiagrams]', 'U') IS NOT NULL
    DROP TABLE [dbo].[sysdiagrams];
GO
IF OBJECT_ID(N'[dbo].[UserModule]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UserModule];
GO
IF OBJECT_ID(N'[dbo].[Usr]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Usr];
GO
IF OBJECT_ID(N'[dbo].[Vendor]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Vendor];
GO
IF OBJECT_ID(N'[dbo].[VendorType]', 'U') IS NOT NULL
    DROP TABLE [dbo].[VendorType];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Committees'
CREATE TABLE [dbo].[Committees] (
    [CommitteeID] int IDENTITY(1,1) NOT NULL,
    [CommitteeName] varchar(100)  NULL,
    [CommitteeDescription] varchar(200)  NULL
);
GO

-- Creating table 'CommitteeMembers'
CREATE TABLE [dbo].[CommitteeMembers] (
    [CommitteeMemberID] int IDENTITY(1,1) NOT NULL,
    [CommitteeID] int  NULL,
    [LastName] varchar(50)  NULL,
    [FirstName] varchar(50)  NULL,
    [OtherNames] varchar(50)  NULL,
    [PositionID] int  NULL,
    [EmailAddress] varchar(50)  NULL,
    [active] int  NULL
);
GO

-- Creating table 'Currencies'
CREATE TABLE [dbo].[Currencies] (
    [CurrencyID] int IDENTITY(1,1) NOT NULL,
    [CurrencyName] varchar(50)  NULL,
    [CurrencySymbol] char(4)  NULL
);
GO

-- Creating table 'FinancialYears'
CREATE TABLE [dbo].[FinancialYears] (
    [FinancialYrID] int IDENTITY(1,1) NOT NULL,
    [FinancialYr] char(9)  NULL,
    [Description] varchar(50)  NULL,
    [IsActive] int  NULL
);
GO

-- Creating table 'Items'
CREATE TABLE [dbo].[Items] (
    [ItemID] int IDENTITY(1,1) NOT NULL,
    [ItemName] varchar(50)  NULL,
    [ItemCode] varchar(50)  NULL,
    [MinStockLevel] int  NULL,
    [MaxStockLevel] int  NULL,
    [ItemDescription] varchar(200)  NULL,
    [SIUnitID] int  NULL,
    [CreatedBy] varchar(50)  NULL,
    [CreatedDate] datetime  NULL,
    [LastUpdatedBy] varchar(50)  NULL,
    [LastUpdatedDate] datetime  NULL,
    [ItemCategoryID] int  NULL
);
GO

-- Creating table 'ItemCategories'
CREATE TABLE [dbo].[ItemCategories] (
    [CategoryID] int IDENTITY(1,1) NOT NULL,
    [CategoryName] varchar(50)  NULL,
    [CategoryDescription] varchar(200)  NULL
);
GO

-- Creating table 'Loggers'
CREATE TABLE [dbo].[Loggers] (
    [LogID] int IDENTITY(1,1) NOT NULL,
    [LogEntity] varchar(50)  NULL,
    [LogEvent] varchar(50)  NULL,
    [LogDescription] varchar(500)  NULL,
    [LogActor] varchar(50)  NULL
);
GO

-- Creating table 'LPOes'
CREATE TABLE [dbo].[LPOes] (
    [LPOID] int IDENTITY(1,1) NOT NULL,
    [RequisitionNo] varchar(50)  NULL,
    [VAT] decimal(9,2)  NULL,
    [PurchaseOrderDate] datetime  NULL,
    [ExpectedDeliveryDate] datetime  NULL,
    [ShippingAddress] varchar(200)  NULL,
    [PaymentTerm] varchar(50)  NULL,
    [OtherTermsAndConditions] varchar(200)  NULL,
    [LPOStatusID] int  NULL,
    [VendorID] int  NULL,
    [TotAmt] decimal(18,2)  NULL,
    [LPONo] varchar(50)  NULL,
    [NetAmt] decimal(18,2)  NULL,
    [ProcurementTypeId] int  NULL
);
GO

-- Creating table 'Modules'
CREATE TABLE [dbo].[Modules] (
    [ModuleID] int IDENTITY(1,1) NOT NULL,
    [SystemName] varchar(50)  NULL,
    [PublicName] varchar(50)  NULL,
    [DateAssigned] datetime  NULL
);
GO

-- Creating table 'PriorityTypes'
CREATE TABLE [dbo].[PriorityTypes] (
    [PriorityID] int IDENTITY(1,1) NOT NULL,
    [PriorityDescription] varchar(50)  NULL
);
GO

-- Creating table 'Requisitions'
CREATE TABLE [dbo].[Requisitions] (
    [RequisitionID] int IDENTITY(1,1) NOT NULL,
    [RequisitionNo] varchar(max)  NULL,
    [RequestedBy] varchar(50)  NULL,
    [FinancialYrID] int  NULL,
    [CompanyID] int  NULL,
    [DepartmentID] int  NULL,
    [RequisitionTypeID] int  NULL,
    [Location] varchar(50)  NULL,
    [CurrencyID] int  NULL,
    [PriorityID] int  NULL,
    [RequisitionTotal] decimal(18,2)  NULL,
    [RequisitionDescription] varchar(100)  NULL,
    [RequisitionStatusID] int  NULL,
    [CreatedBy] varchar(50)  NULL,
    [CreatedDate] datetime  NULL,
    [AuthorizedBy] varchar(50)  NULL,
    [AuthorizedDate] datetime  NULL,
    [LastUpdatedBy] varchar(50)  NULL,
    [LastUpdatedDate] datetime  NULL,
    [isNotif] int  NULL,
    [reqSrc] varchar(max)  NULL
);
GO

-- Creating table 'RequisitionItems'
CREATE TABLE [dbo].[RequisitionItems] (
    [RequisitionItemID] int IDENTITY(1,1) NOT NULL,
    [RequisitionID] int  NULL,
    [ItemID] int  NULL,
    [Quantity] int  NULL,
    [Narration] varchar(50)  NULL,
    [FinApprovalStatus] int  NULL,
    [Amt] decimal(18,2)  NULL,
    [LPOID] int  NULL
);
GO

-- Creating table 'RequisitionStatus'
CREATE TABLE [dbo].[RequisitionStatus] (
    [RequisitionStatusID] int IDENTITY(1,1) NOT NULL,
    [RequisitionStatusDesc] varchar(50)  NULL
);
GO

-- Creating table 'RequisitionTypes'
CREATE TABLE [dbo].[RequisitionTypes] (
    [RequisitionTypeID] int IDENTITY(1,1) NOT NULL,
    [RequisitionType1] varchar(50)  NULL,
    [RequisitionDescription] varchar(100)  NULL
);
GO

-- Creating table 'SIUnits'
CREATE TABLE [dbo].[SIUnits] (
    [SIUnitID] int IDENTITY(1,1) NOT NULL,
    [Metric] varchar(50)  NULL,
    [Measurement] varchar(50)  NULL
);
GO

-- Creating table 'UserModules'
CREATE TABLE [dbo].[UserModules] (
    [UserModuleID] int IDENTITY(1,1) NOT NULL,
    [UserName] varchar(50)  NULL,
    [ModuleID] int  NULL,
    [DateAssigned] datetime  NULL
);
GO

-- Creating table 'Vendors'
CREATE TABLE [dbo].[Vendors] (
    [VendorID] int IDENTITY(1,1) NOT NULL,
    [VendorName] varchar(100)  NULL,
    [ContactPerson] varchar(100)  NULL,
    [VendorTypeID] int  NULL,
    [CompanyRegistrationNo] varchar(50)  NULL,
    [IncorporationDate] datetime  NULL,
    [TIN] varchar(50)  NULL,
    [NameOfOwner] varchar(100)  NULL,
    [CompanyContact] varchar(50)  NULL,
    [CompanyWebsite] varchar(50)  NULL,
    [CompanyEmailAddress] varchar(50)  NULL,
    [CreatedBy] varchar(50)  NULL,
    [CreatedDate] datetime  NULL,
    [LastUpdatedBy] varchar(50)  NULL,
    [LastUpdatedDate] datetime  NULL,
    [VendorNo] varchar(50)  NULL,
    [VendorLocation] varchar(50)  NULL,
    [CompanyFb] varchar(50)  NULL,
    [CompanyLinkedIn] varchar(50)  NULL,
    [CompanyGHPostAddress] varchar(50)  NULL,
    [CompanyHomeContact] varchar(50)  NULL,
    [CompanyBusinessTypeID] int  NULL
);
GO

-- Creating table 'VendorTypes'
CREATE TABLE [dbo].[VendorTypes] (
    [VendorTypeID] int IDENTITY(1,1) NOT NULL,
    [VendorDescription] varchar(500)  NULL
);
GO

-- Creating table 'BusinessTypes'
CREATE TABLE [dbo].[BusinessTypes] (
    [BusinessTypeID] int IDENTITY(1,1) NOT NULL,
    [BusinessDescription] varchar(50)  NULL
);
GO

-- Creating table 'NotificationLists'
CREATE TABLE [dbo].[NotificationLists] (
    [NotificationID] int IDENTITY(1,1) NOT NULL,
    [FirstName] varchar(50)  NULL,
    [LastName] varchar(50)  NULL,
    [EmailAddress] varchar(60)  NULL,
    [tag] varchar(200)  NULL,
    [isActive] int  NULL
);
GO

-- Creating table 'Positions'
CREATE TABLE [dbo].[Positions] (
    [PositionID] int IDENTITY(1,1) NOT NULL,
    [Designation] varchar(100)  NULL
);
GO

-- Creating table 'Companies'
CREATE TABLE [dbo].[Companies] (
    [CompanyID] int IDENTITY(1,1) NOT NULL,
    [CompanyDescription] varchar(50)  NULL
);
GO

-- Creating table 'Departments'
CREATE TABLE [dbo].[Departments] (
    [DepartmentID] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(255)  NULL,
    [Head] int  NULL
);
GO

-- Creating table 'NotificationGroups'
CREATE TABLE [dbo].[NotificationGroups] (
    [NotificationGroupID] int IDENTITY(1,1) NOT NULL,
    [NotificationGroupName] varchar(100)  NULL,
    [NotificationMailString] varchar(max)  NULL,
    [NotificationDescription] varchar(200)  NULL
);
GO

-- Creating table 'PFNotificationLists'
CREATE TABLE [dbo].[PFNotificationLists] (
    [PFNotificationListID] int IDENTITY(1,1) NOT NULL,
    [PFID] int  NOT NULL,
    [NotificationGroupID] int  NULL
);
GO

-- Creating table 'ProcessFlows'
CREATE TABLE [dbo].[ProcessFlows] (
    [ProcessFlowID] int IDENTITY(1,1) NOT NULL,
    [ProcurementTypeId] int  NULL,
    [Limit] decimal(18,2)  NULL,
    [ProcessFlowOrder] int  NULL
);
GO

-- Creating table 'ProcurementTypes'
CREATE TABLE [dbo].[ProcurementTypes] (
    [ProcurementTypeID] int IDENTITY(1,1) NOT NULL,
    [ProcurementDescription] varchar(200)  NULL
);
GO

-- Creating table 'ProcessFlowLists'
CREATE TABLE [dbo].[ProcessFlowLists] (
    [ProcessFlowListID] int IDENTITY(1,1) NOT NULL,
    [ProcessFlowID] int  NULL,
    [Flow] varchar(max)  NULL
);
GO

-- Creating table 'Capexes'
CREATE TABLE [dbo].[Capexes] (
    [CapexID] int IDENTITY(1,1) NOT NULL,
    [CapexTypeID] int  NULL,
    [EstimatedDeadline] varchar(50)  NULL,
    [QuantityRequested] int  NULL,
    [QuantitySupplied] int  NULL,
    [QuantityOutstanding] int  NULL,
    [Justification] varchar(max)  NULL,
    [FinancialYrId] int  NULL,
    [DId] int  NULL,
    [CapexItemID] int  NULL
);
GO

-- Creating table 'sysdiagrams'
CREATE TABLE [dbo].[sysdiagrams] (
    [name] nvarchar(128)  NOT NULL,
    [principal_id] int  NOT NULL,
    [diagram_id] int IDENTITY(1,1) NOT NULL,
    [version] int  NULL,
    [definition] varbinary(max)  NULL
);
GO

-- Creating table 'Profiles'
CREATE TABLE [dbo].[Profiles] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [profileName] varchar(50)  NULL,
    [profileContent] varchar(500)  NULL,
    [inUse] int  NULL
);
GO

-- Creating table 'Usrs'
CREATE TABLE [dbo].[Usrs] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [usrname] varchar(60)  NULL,
    [usrpassword] varchar(300)  NULL,
    [deptId] int  NULL,
    [isActive] int  NULL,
    [isLogged] int  NULL,
    [isAD] int  NULL,
    [isAdmin] int  NULL,
    [uProfile] varchar(50)  NULL,
    [tag] varchar(50)  NULL,
    [surname] varchar(50)  NULL,
    [firstname] varchar(50)  NULL,
    [othernames] varchar(200)  NULL
);
GO

-- Creating table 'LPOApprovals'
CREATE TABLE [dbo].[LPOApprovals] (
    [ApprovalID] int IDENTITY(1,1) NOT NULL,
    [LPO_ID] int  NULL,
    [PersonTag] varchar(50)  NULL,
    [ApprovalDate] datetime  NULL,
    [ApprovalStatus] int  NULL,
    [ApprovalComments] varchar(max)  NULL,
    [PersonName] varchar(max)  NULL
);
GO

-- Creating table 'Cfgs'
CREATE TABLE [dbo].[Cfgs] (
    [cfid] int IDENTITY(1,1) NOT NULL,
    [C_capex_flag] int  NULL
);
GO

-- Creating table 'RequisitionFiles'
CREATE TABLE [dbo].[RequisitionFiles] (
    [RequisitionFileID] int IDENTITY(1,1) NOT NULL,
    [RequisitionID] int  NULL,
    [RequisitionFileDescription] varchar(200)  NULL,
    [RequisitionFileName] varbinary(max)  NULL
);
GO

-- Creating table 'AlternativeCapexes'
CREATE TABLE [dbo].[AlternativeCapexes] (
    [AltCapexID] int  NOT NULL,
    [DId] int  NULL,
    [AltCapexItemID] int  NULL,
    [Qty] int  NULL,
    [FinYrID] int  NULL,
    [dte] datetime  NULL
);
GO

-- Creating table 'AlternativeCapex1'
CREATE TABLE [dbo].[AlternativeCapex1] (
    [AltCapexID] int IDENTITY(1,1) NOT NULL,
    [DId] int  NULL,
    [AltCapexItemID] int  NULL,
    [Qty] int  NULL,
    [FinYrID] int  NULL,
    [dte] datetime  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [CommitteeID] in table 'Committees'
ALTER TABLE [dbo].[Committees]
ADD CONSTRAINT [PK_Committees]
    PRIMARY KEY CLUSTERED ([CommitteeID] ASC);
GO

-- Creating primary key on [CommitteeMemberID] in table 'CommitteeMembers'
ALTER TABLE [dbo].[CommitteeMembers]
ADD CONSTRAINT [PK_CommitteeMembers]
    PRIMARY KEY CLUSTERED ([CommitteeMemberID] ASC);
GO

-- Creating primary key on [CurrencyID] in table 'Currencies'
ALTER TABLE [dbo].[Currencies]
ADD CONSTRAINT [PK_Currencies]
    PRIMARY KEY CLUSTERED ([CurrencyID] ASC);
GO

-- Creating primary key on [FinancialYrID] in table 'FinancialYears'
ALTER TABLE [dbo].[FinancialYears]
ADD CONSTRAINT [PK_FinancialYears]
    PRIMARY KEY CLUSTERED ([FinancialYrID] ASC);
GO

-- Creating primary key on [ItemID] in table 'Items'
ALTER TABLE [dbo].[Items]
ADD CONSTRAINT [PK_Items]
    PRIMARY KEY CLUSTERED ([ItemID] ASC);
GO

-- Creating primary key on [CategoryID] in table 'ItemCategories'
ALTER TABLE [dbo].[ItemCategories]
ADD CONSTRAINT [PK_ItemCategories]
    PRIMARY KEY CLUSTERED ([CategoryID] ASC);
GO

-- Creating primary key on [LogID] in table 'Loggers'
ALTER TABLE [dbo].[Loggers]
ADD CONSTRAINT [PK_Loggers]
    PRIMARY KEY CLUSTERED ([LogID] ASC);
GO

-- Creating primary key on [LPOID] in table 'LPOes'
ALTER TABLE [dbo].[LPOes]
ADD CONSTRAINT [PK_LPOes]
    PRIMARY KEY CLUSTERED ([LPOID] ASC);
GO

-- Creating primary key on [ModuleID] in table 'Modules'
ALTER TABLE [dbo].[Modules]
ADD CONSTRAINT [PK_Modules]
    PRIMARY KEY CLUSTERED ([ModuleID] ASC);
GO

-- Creating primary key on [PriorityID] in table 'PriorityTypes'
ALTER TABLE [dbo].[PriorityTypes]
ADD CONSTRAINT [PK_PriorityTypes]
    PRIMARY KEY CLUSTERED ([PriorityID] ASC);
GO

-- Creating primary key on [RequisitionID] in table 'Requisitions'
ALTER TABLE [dbo].[Requisitions]
ADD CONSTRAINT [PK_Requisitions]
    PRIMARY KEY CLUSTERED ([RequisitionID] ASC);
GO

-- Creating primary key on [RequisitionItemID] in table 'RequisitionItems'
ALTER TABLE [dbo].[RequisitionItems]
ADD CONSTRAINT [PK_RequisitionItems]
    PRIMARY KEY CLUSTERED ([RequisitionItemID] ASC);
GO

-- Creating primary key on [RequisitionStatusID] in table 'RequisitionStatus'
ALTER TABLE [dbo].[RequisitionStatus]
ADD CONSTRAINT [PK_RequisitionStatus]
    PRIMARY KEY CLUSTERED ([RequisitionStatusID] ASC);
GO

-- Creating primary key on [RequisitionTypeID] in table 'RequisitionTypes'
ALTER TABLE [dbo].[RequisitionTypes]
ADD CONSTRAINT [PK_RequisitionTypes]
    PRIMARY KEY CLUSTERED ([RequisitionTypeID] ASC);
GO

-- Creating primary key on [SIUnitID] in table 'SIUnits'
ALTER TABLE [dbo].[SIUnits]
ADD CONSTRAINT [PK_SIUnits]
    PRIMARY KEY CLUSTERED ([SIUnitID] ASC);
GO

-- Creating primary key on [UserModuleID] in table 'UserModules'
ALTER TABLE [dbo].[UserModules]
ADD CONSTRAINT [PK_UserModules]
    PRIMARY KEY CLUSTERED ([UserModuleID] ASC);
GO

-- Creating primary key on [VendorID] in table 'Vendors'
ALTER TABLE [dbo].[Vendors]
ADD CONSTRAINT [PK_Vendors]
    PRIMARY KEY CLUSTERED ([VendorID] ASC);
GO

-- Creating primary key on [VendorTypeID] in table 'VendorTypes'
ALTER TABLE [dbo].[VendorTypes]
ADD CONSTRAINT [PK_VendorTypes]
    PRIMARY KEY CLUSTERED ([VendorTypeID] ASC);
GO

-- Creating primary key on [BusinessTypeID] in table 'BusinessTypes'
ALTER TABLE [dbo].[BusinessTypes]
ADD CONSTRAINT [PK_BusinessTypes]
    PRIMARY KEY CLUSTERED ([BusinessTypeID] ASC);
GO

-- Creating primary key on [NotificationID] in table 'NotificationLists'
ALTER TABLE [dbo].[NotificationLists]
ADD CONSTRAINT [PK_NotificationLists]
    PRIMARY KEY CLUSTERED ([NotificationID] ASC);
GO

-- Creating primary key on [PositionID] in table 'Positions'
ALTER TABLE [dbo].[Positions]
ADD CONSTRAINT [PK_Positions]
    PRIMARY KEY CLUSTERED ([PositionID] ASC);
GO

-- Creating primary key on [CompanyID] in table 'Companies'
ALTER TABLE [dbo].[Companies]
ADD CONSTRAINT [PK_Companies]
    PRIMARY KEY CLUSTERED ([CompanyID] ASC);
GO

-- Creating primary key on [DepartmentID] in table 'Departments'
ALTER TABLE [dbo].[Departments]
ADD CONSTRAINT [PK_Departments]
    PRIMARY KEY CLUSTERED ([DepartmentID] ASC);
GO

-- Creating primary key on [NotificationGroupID] in table 'NotificationGroups'
ALTER TABLE [dbo].[NotificationGroups]
ADD CONSTRAINT [PK_NotificationGroups]
    PRIMARY KEY CLUSTERED ([NotificationGroupID] ASC);
GO

-- Creating primary key on [PFNotificationListID] in table 'PFNotificationLists'
ALTER TABLE [dbo].[PFNotificationLists]
ADD CONSTRAINT [PK_PFNotificationLists]
    PRIMARY KEY CLUSTERED ([PFNotificationListID] ASC);
GO

-- Creating primary key on [ProcessFlowID] in table 'ProcessFlows'
ALTER TABLE [dbo].[ProcessFlows]
ADD CONSTRAINT [PK_ProcessFlows]
    PRIMARY KEY CLUSTERED ([ProcessFlowID] ASC);
GO

-- Creating primary key on [ProcurementTypeID] in table 'ProcurementTypes'
ALTER TABLE [dbo].[ProcurementTypes]
ADD CONSTRAINT [PK_ProcurementTypes]
    PRIMARY KEY CLUSTERED ([ProcurementTypeID] ASC);
GO

-- Creating primary key on [ProcessFlowListID] in table 'ProcessFlowLists'
ALTER TABLE [dbo].[ProcessFlowLists]
ADD CONSTRAINT [PK_ProcessFlowLists]
    PRIMARY KEY CLUSTERED ([ProcessFlowListID] ASC);
GO

-- Creating primary key on [CapexID] in table 'Capexes'
ALTER TABLE [dbo].[Capexes]
ADD CONSTRAINT [PK_Capexes]
    PRIMARY KEY CLUSTERED ([CapexID] ASC);
GO

-- Creating primary key on [diagram_id] in table 'sysdiagrams'
ALTER TABLE [dbo].[sysdiagrams]
ADD CONSTRAINT [PK_sysdiagrams]
    PRIMARY KEY CLUSTERED ([diagram_id] ASC);
GO

-- Creating primary key on [Id] in table 'Profiles'
ALTER TABLE [dbo].[Profiles]
ADD CONSTRAINT [PK_Profiles]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Usrs'
ALTER TABLE [dbo].[Usrs]
ADD CONSTRAINT [PK_Usrs]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [ApprovalID] in table 'LPOApprovals'
ALTER TABLE [dbo].[LPOApprovals]
ADD CONSTRAINT [PK_LPOApprovals]
    PRIMARY KEY CLUSTERED ([ApprovalID] ASC);
GO

-- Creating primary key on [cfid] in table 'Cfgs'
ALTER TABLE [dbo].[Cfgs]
ADD CONSTRAINT [PK_Cfgs]
    PRIMARY KEY CLUSTERED ([cfid] ASC);
GO

-- Creating primary key on [RequisitionFileID] in table 'RequisitionFiles'
ALTER TABLE [dbo].[RequisitionFiles]
ADD CONSTRAINT [PK_RequisitionFiles]
    PRIMARY KEY CLUSTERED ([RequisitionFileID] ASC);
GO

-- Creating primary key on [AltCapexID] in table 'AlternativeCapexes'
ALTER TABLE [dbo].[AlternativeCapexes]
ADD CONSTRAINT [PK_AlternativeCapexes]
    PRIMARY KEY CLUSTERED ([AltCapexID] ASC);
GO

-- Creating primary key on [AltCapexID] in table 'AlternativeCapex1'
ALTER TABLE [dbo].[AlternativeCapex1]
ADD CONSTRAINT [PK_AlternativeCapex1]
    PRIMARY KEY CLUSTERED ([AltCapexID] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [CommitteeID] in table 'CommitteeMembers'
ALTER TABLE [dbo].[CommitteeMembers]
ADD CONSTRAINT [FK_CommitteeMember_Committee]
    FOREIGN KEY ([CommitteeID])
    REFERENCES [dbo].[Committees]
        ([CommitteeID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CommitteeMember_Committee'
CREATE INDEX [IX_FK_CommitteeMember_Committee]
ON [dbo].[CommitteeMembers]
    ([CommitteeID]);
GO

-- Creating foreign key on [CurrencyID] in table 'Requisitions'
ALTER TABLE [dbo].[Requisitions]
ADD CONSTRAINT [FK_Requisition_Currency]
    FOREIGN KEY ([CurrencyID])
    REFERENCES [dbo].[Currencies]
        ([CurrencyID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Requisition_Currency'
CREATE INDEX [IX_FK_Requisition_Currency]
ON [dbo].[Requisitions]
    ([CurrencyID]);
GO

-- Creating foreign key on [FinancialYrID] in table 'Requisitions'
ALTER TABLE [dbo].[Requisitions]
ADD CONSTRAINT [FK_Requisition_FinancialYear]
    FOREIGN KEY ([FinancialYrID])
    REFERENCES [dbo].[FinancialYears]
        ([FinancialYrID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Requisition_FinancialYear'
CREATE INDEX [IX_FK_Requisition_FinancialYear]
ON [dbo].[Requisitions]
    ([FinancialYrID]);
GO

-- Creating foreign key on [ItemCategoryID] in table 'Items'
ALTER TABLE [dbo].[Items]
ADD CONSTRAINT [FK_Item_ItemCategory]
    FOREIGN KEY ([ItemCategoryID])
    REFERENCES [dbo].[ItemCategories]
        ([CategoryID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Item_ItemCategory'
CREATE INDEX [IX_FK_Item_ItemCategory]
ON [dbo].[Items]
    ([ItemCategoryID]);
GO

-- Creating foreign key on [SIUnitID] in table 'Items'
ALTER TABLE [dbo].[Items]
ADD CONSTRAINT [FK_Item_SIUnit]
    FOREIGN KEY ([SIUnitID])
    REFERENCES [dbo].[SIUnits]
        ([SIUnitID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Item_SIUnit'
CREATE INDEX [IX_FK_Item_SIUnit]
ON [dbo].[Items]
    ([SIUnitID]);
GO

-- Creating foreign key on [PriorityID] in table 'Requisitions'
ALTER TABLE [dbo].[Requisitions]
ADD CONSTRAINT [FK_Requisition_PriorityType]
    FOREIGN KEY ([PriorityID])
    REFERENCES [dbo].[PriorityTypes]
        ([PriorityID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Requisition_PriorityType'
CREATE INDEX [IX_FK_Requisition_PriorityType]
ON [dbo].[Requisitions]
    ([PriorityID]);
GO

-- Creating foreign key on [RequisitionStatusID] in table 'Requisitions'
ALTER TABLE [dbo].[Requisitions]
ADD CONSTRAINT [FK_Requisition_RequisitionStatus]
    FOREIGN KEY ([RequisitionStatusID])
    REFERENCES [dbo].[RequisitionStatus]
        ([RequisitionStatusID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Requisition_RequisitionStatus'
CREATE INDEX [IX_FK_Requisition_RequisitionStatus]
ON [dbo].[Requisitions]
    ([RequisitionStatusID]);
GO

-- Creating foreign key on [RequisitionTypeID] in table 'Requisitions'
ALTER TABLE [dbo].[Requisitions]
ADD CONSTRAINT [FK_Requisition_RequisitionType]
    FOREIGN KEY ([RequisitionTypeID])
    REFERENCES [dbo].[RequisitionTypes]
        ([RequisitionTypeID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Requisition_RequisitionType'
CREATE INDEX [IX_FK_Requisition_RequisitionType]
ON [dbo].[Requisitions]
    ([RequisitionTypeID]);
GO

-- Creating foreign key on [VendorTypeID] in table 'Vendors'
ALTER TABLE [dbo].[Vendors]
ADD CONSTRAINT [FK_Vendor_VendorType]
    FOREIGN KEY ([VendorTypeID])
    REFERENCES [dbo].[VendorTypes]
        ([VendorTypeID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Vendor_VendorType'
CREATE INDEX [IX_FK_Vendor_VendorType]
ON [dbo].[Vendors]
    ([VendorTypeID]);
GO

-- Creating foreign key on [ModuleID] in table 'UserModules'
ALTER TABLE [dbo].[UserModules]
ADD CONSTRAINT [FK_UserModule_Module]
    FOREIGN KEY ([ModuleID])
    REFERENCES [dbo].[Modules]
        ([ModuleID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserModule_Module'
CREATE INDEX [IX_FK_UserModule_Module]
ON [dbo].[UserModules]
    ([ModuleID]);
GO

-- Creating foreign key on [CompanyBusinessTypeID] in table 'Vendors'
ALTER TABLE [dbo].[Vendors]
ADD CONSTRAINT [FK_Vendor_BusinessType]
    FOREIGN KEY ([CompanyBusinessTypeID])
    REFERENCES [dbo].[BusinessTypes]
        ([BusinessTypeID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Vendor_BusinessType'
CREATE INDEX [IX_FK_Vendor_BusinessType]
ON [dbo].[Vendors]
    ([CompanyBusinessTypeID]);
GO

-- Creating foreign key on [PositionID] in table 'CommitteeMembers'
ALTER TABLE [dbo].[CommitteeMembers]
ADD CONSTRAINT [FK_CommitteeMember_Position]
    FOREIGN KEY ([PositionID])
    REFERENCES [dbo].[Positions]
        ([PositionID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CommitteeMember_Position'
CREATE INDEX [IX_FK_CommitteeMember_Position]
ON [dbo].[CommitteeMembers]
    ([PositionID]);
GO

-- Creating foreign key on [CompanyID] in table 'Requisitions'
ALTER TABLE [dbo].[Requisitions]
ADD CONSTRAINT [FK_Requisition_Company]
    FOREIGN KEY ([CompanyID])
    REFERENCES [dbo].[Companies]
        ([CompanyID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Requisition_Company'
CREATE INDEX [IX_FK_Requisition_Company]
ON [dbo].[Requisitions]
    ([CompanyID]);
GO

-- Creating foreign key on [DepartmentID] in table 'Requisitions'
ALTER TABLE [dbo].[Requisitions]
ADD CONSTRAINT [FK_Requisition_Department]
    FOREIGN KEY ([DepartmentID])
    REFERENCES [dbo].[Departments]
        ([DepartmentID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Requisition_Department'
CREATE INDEX [IX_FK_Requisition_Department]
ON [dbo].[Requisitions]
    ([DepartmentID]);
GO

-- Creating foreign key on [NotificationGroupID] in table 'PFNotificationLists'
ALTER TABLE [dbo].[PFNotificationLists]
ADD CONSTRAINT [FK_PFNotificationList_NotificationGroup]
    FOREIGN KEY ([NotificationGroupID])
    REFERENCES [dbo].[NotificationGroups]
        ([NotificationGroupID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PFNotificationList_NotificationGroup'
CREATE INDEX [IX_FK_PFNotificationList_NotificationGroup]
ON [dbo].[PFNotificationLists]
    ([NotificationGroupID]);
GO

-- Creating foreign key on [PFID] in table 'PFNotificationLists'
ALTER TABLE [dbo].[PFNotificationLists]
ADD CONSTRAINT [FK_PFNotificationList_ProcessFlow]
    FOREIGN KEY ([PFID])
    REFERENCES [dbo].[ProcessFlows]
        ([ProcessFlowID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PFNotificationList_ProcessFlow'
CREATE INDEX [IX_FK_PFNotificationList_ProcessFlow]
ON [dbo].[PFNotificationLists]
    ([PFID]);
GO

-- Creating foreign key on [ProcurementTypeId] in table 'ProcessFlows'
ALTER TABLE [dbo].[ProcessFlows]
ADD CONSTRAINT [FK_ProcessFlow_ProcurementType]
    FOREIGN KEY ([ProcurementTypeId])
    REFERENCES [dbo].[ProcurementTypes]
        ([ProcurementTypeID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ProcessFlow_ProcurementType'
CREATE INDEX [IX_FK_ProcessFlow_ProcurementType]
ON [dbo].[ProcessFlows]
    ([ProcurementTypeId]);
GO

-- Creating foreign key on [LPOID] in table 'RequisitionItems'
ALTER TABLE [dbo].[RequisitionItems]
ADD CONSTRAINT [FK_RequisitionItem_LPO]
    FOREIGN KEY ([LPOID])
    REFERENCES [dbo].[LPOes]
        ([LPOID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_RequisitionItem_LPO'
CREATE INDEX [IX_FK_RequisitionItem_LPO]
ON [dbo].[RequisitionItems]
    ([LPOID]);
GO

-- Creating foreign key on [deptId] in table 'Usrs'
ALTER TABLE [dbo].[Usrs]
ADD CONSTRAINT [FK_Usr_Department]
    FOREIGN KEY ([deptId])
    REFERENCES [dbo].[Departments]
        ([DepartmentID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Usr_Department'
CREATE INDEX [IX_FK_Usr_Department]
ON [dbo].[Usrs]
    ([deptId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------