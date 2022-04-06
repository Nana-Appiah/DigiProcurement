USE [master]
GO
/****** Object:  Database [EProcurementDb]    Script Date: 06/04/2022 9:58:12 am ******/
CREATE DATABASE [EProcurementDb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'EProcurementDb', FILENAME = N'C:\SQL\SQL\Data\EProcurementDb.mdf' , SIZE = 30720KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'EProcurementDb_log', FILENAME = N'C:\SQL\SQL\Log\EProcurementDb_log.ldf' , SIZE = 20480KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [EProcurementDb] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [EProcurementDb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [EProcurementDb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [EProcurementDb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [EProcurementDb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [EProcurementDb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [EProcurementDb] SET ARITHABORT OFF 
GO
ALTER DATABASE [EProcurementDb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [EProcurementDb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [EProcurementDb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [EProcurementDb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [EProcurementDb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [EProcurementDb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [EProcurementDb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [EProcurementDb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [EProcurementDb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [EProcurementDb] SET  DISABLE_BROKER 
GO
ALTER DATABASE [EProcurementDb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [EProcurementDb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [EProcurementDb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [EProcurementDb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [EProcurementDb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [EProcurementDb] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [EProcurementDb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [EProcurementDb] SET RECOVERY FULL 
GO
ALTER DATABASE [EProcurementDb] SET  MULTI_USER 
GO
ALTER DATABASE [EProcurementDb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [EProcurementDb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [EProcurementDb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [EProcurementDb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [EProcurementDb] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [EProcurementDb] SET QUERY_STORE = OFF
GO
USE [EProcurementDb]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [EProcurementDb]
GO
/****** Object:  Table [dbo].[BusinessType]    Script Date: 06/04/2022 9:58:12 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BusinessType](
	[BusinessTypeID] [int] IDENTITY(1,1) NOT NULL,
	[BusinessDescription] [varchar](50) NULL,
 CONSTRAINT [PK_BusinessType] PRIMARY KEY CLUSTERED 
(
	[BusinessTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Committee]    Script Date: 06/04/2022 9:58:12 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Committee](
	[CommitteeID] [int] IDENTITY(1,1) NOT NULL,
	[CommitteeName] [varchar](100) NULL,
	[CommitteeDescription] [varchar](200) NULL,
 CONSTRAINT [PK_Committee] PRIMARY KEY CLUSTERED 
(
	[CommitteeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CommitteeMember]    Script Date: 06/04/2022 9:58:12 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CommitteeMember](
	[CommitteeMemberID] [int] IDENTITY(1,1) NOT NULL,
	[CommitteeID] [int] NULL,
	[LastName] [varchar](50) NULL,
	[FirstName] [varchar](50) NULL,
	[OtherNames] [varchar](50) NULL,
	[PositionID] [int] NULL,
	[EmailAddress] [varchar](50) NULL,
	[active] [int] NULL,
 CONSTRAINT [PK_CommitteeMember] PRIMARY KEY CLUSTERED 
(
	[CommitteeMemberID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Currency]    Script Date: 06/04/2022 9:58:12 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Currency](
	[CurrencyID] [int] IDENTITY(1,1) NOT NULL,
	[CurrencyName] [varchar](50) NULL,
	[CurrencySymbol] [char](4) NULL,
 CONSTRAINT [PK_Currency] PRIMARY KEY CLUSTERED 
(
	[CurrencyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FinancialYear]    Script Date: 06/04/2022 9:58:12 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FinancialYear](
	[FinancialYrID] [int] IDENTITY(1,1) NOT NULL,
	[FinancialYr] [char](9) NULL,
	[Description] [varchar](50) NULL,
	[IsActive] [int] NULL,
 CONSTRAINT [PK_FinancialYear] PRIMARY KEY CLUSTERED 
(
	[FinancialYrID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Item]    Script Date: 06/04/2022 9:58:12 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Item](
	[ItemID] [int] IDENTITY(1,1) NOT NULL,
	[ItemName] [varchar](50) NULL,
	[ItemCode] [varchar](50) NULL,
	[MinStockLevel] [int] NULL,
	[MaxStockLevel] [int] NULL,
	[ItemDescription] [varchar](200) NULL,
	[SIUnitID] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedDate] [date] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedDate] [date] NULL,
	[ItemCategoryID] [int] NULL,
 CONSTRAINT [PK_Item] PRIMARY KEY CLUSTERED 
(
	[ItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemCategory]    Script Date: 06/04/2022 9:58:12 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemCategory](
	[CategoryID] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [varchar](50) NULL,
	[CategoryDescription] [varchar](200) NULL,
 CONSTRAINT [PK_ItemCategory] PRIMARY KEY CLUSTERED 
(
	[CategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Logger]    Script Date: 06/04/2022 9:58:12 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Logger](
	[LogID] [int] IDENTITY(1,1) NOT NULL,
	[LogEntity] [varchar](50) NULL,
	[LogEvent] [varchar](50) NULL,
	[LogDescription] [varchar](500) NULL,
	[LogActor] [varchar](50) NULL,
 CONSTRAINT [PK_Logger] PRIMARY KEY CLUSTERED 
(
	[LogID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LPO]    Script Date: 06/04/2022 9:58:12 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LPO](
	[LPOID] [int] IDENTITY(1,1) NOT NULL,
	[RequisitionNo] [varchar](50) NULL,
	[VAT] [numeric](9, 2) NULL,
	[PurchaseOrderDate] [date] NULL,
	[ExpectedDeliveryDate] [date] NULL,
	[ShippingAddress] [varchar](200) NULL,
	[PaymentTerm] [varchar](50) NULL,
	[OtherTermsAndConditions] [varchar](200) NULL,
 CONSTRAINT [PK_LPO] PRIMARY KEY CLUSTERED 
(
	[LPOID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Module]    Script Date: 06/04/2022 9:58:12 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Module](
	[ModuleID] [int] IDENTITY(1,1) NOT NULL,
	[SystemName] [varchar](50) NULL,
	[PublicName] [varchar](50) NULL,
	[DateAssigned] [date] NULL,
 CONSTRAINT [PK_UserModule] PRIMARY KEY CLUSTERED 
(
	[ModuleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PriorityType]    Script Date: 06/04/2022 9:58:12 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PriorityType](
	[PriorityID] [int] IDENTITY(1,1) NOT NULL,
	[PriorityDescription] [varchar](50) NULL,
 CONSTRAINT [PK_PriorityType] PRIMARY KEY CLUSTERED 
(
	[PriorityID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Requisition]    Script Date: 06/04/2022 9:58:13 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Requisition](
	[RequisitionID] [int] IDENTITY(1,1) NOT NULL,
	[RequisitionNo] [varchar](25) NULL,
	[RequestedBy] [varchar](50) NULL,
	[FinancialYrID] [int] NULL,
	[CompanyID] [int] NULL,
	[DepartmentID] [int] NULL,
	[RequisitionTypeID] [int] NULL,
	[Location] [varchar](50) NULL,
	[CurrencyID] [int] NULL,
	[PriorityID] [int] NULL,
	[RequisitionTotal] [numeric](18, 2) NULL,
	[RequisitionDescription] [varchar](100) NULL,
	[RequisitionStatusID] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedDate] [date] NULL,
	[AuthorizedBy] [varchar](50) NULL,
	[AuthorizedDate] [date] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedDate] [date] NULL,
 CONSTRAINT [PK_Requisition] PRIMARY KEY CLUSTERED 
(
	[RequisitionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RequisitionItem]    Script Date: 06/04/2022 9:58:13 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RequisitionItem](
	[RequisitionItemID] [int] IDENTITY(1,1) NOT NULL,
	[RequisitionID] [int] NULL,
	[ItemID] [int] NULL,
	[Quantity] [int] NULL,
	[ItemRate] [numeric](9, 2) NULL,
	[ItemAmount] [numeric](18, 2) NULL,
 CONSTRAINT [PK_RequisitionItem] PRIMARY KEY CLUSTERED 
(
	[RequisitionItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RequisitionStatus]    Script Date: 06/04/2022 9:58:13 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RequisitionStatus](
	[RequisitionStatusID] [int] IDENTITY(1,1) NOT NULL,
	[RequisitionStatusDesc] [varchar](50) NULL,
 CONSTRAINT [PK_RequistionStatus] PRIMARY KEY CLUSTERED 
(
	[RequisitionStatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RequisitionType]    Script Date: 06/04/2022 9:58:13 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RequisitionType](
	[RequisitionTypeID] [int] IDENTITY(1,1) NOT NULL,
	[RequisitionType] [varchar](50) NULL,
	[RequisitionDescription] [varchar](100) NULL,
 CONSTRAINT [PK_RequisitionType] PRIMARY KEY CLUSTERED 
(
	[RequisitionTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SIUnit]    Script Date: 06/04/2022 9:58:13 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SIUnit](
	[SIUnitID] [int] IDENTITY(1,1) NOT NULL,
	[Metric] [varchar](50) NULL,
	[Measurement] [varchar](50) NULL,
 CONSTRAINT [PK_SIUnit] PRIMARY KEY CLUSTERED 
(
	[SIUnitID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserModule]    Script Date: 06/04/2022 9:58:13 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserModule](
	[UserModuleID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NULL,
	[ModuleID] [int] NULL,
	[DateAssigned] [date] NULL,
 CONSTRAINT [PK_UserModule_1] PRIMARY KEY CLUSTERED 
(
	[UserModuleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vendor]    Script Date: 06/04/2022 9:58:13 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vendor](
	[VendorID] [int] IDENTITY(1,1) NOT NULL,
	[VendorNo] [varchar](50) NULL,
	[VendorName] [varchar](100) NULL,
	[VendorLocation] [varchar](50) NULL,
	[ContactPerson] [varchar](100) NULL,
	[VendorTypeID] [int] NULL,
	[CompanyRegistrationNo] [varchar](50) NULL,
	[IncorporationDate] [date] NULL,
	[TIN] [varchar](50) NULL,
	[NameOfOwner] [varchar](100) NULL,
	[CompanyContact] [varchar](50) NULL,
	[CompanyHomeContact] [varchar](50) NULL,
	[CompanyWebsite] [varchar](50) NULL,
	[CompanyFb] [varchar](50) NULL,
	[CompanyLinkedIn] [varchar](50) NULL,
	[CompanyEmailAddress] [varchar](50) NULL,
	[CompanyGHPostAddress] [varchar](50) NULL,
	[CompanyBusinessTypeID] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedDate] [date] NULL,
	[LastUpdatedBy] [varchar](50) NULL,
	[LastUpdatedDate] [date] NULL,
 CONSTRAINT [PK_Vendor] PRIMARY KEY CLUSTERED 
(
	[VendorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VendorType]    Script Date: 06/04/2022 9:58:13 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VendorType](
	[VendorTypeID] [int] IDENTITY(1,1) NOT NULL,
	[VendorDescription] [varchar](500) NULL,
 CONSTRAINT [PK_VendorType] PRIMARY KEY CLUSTERED 
(
	[VendorTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[BusinessType] ON 

INSERT [dbo].[BusinessType] ([BusinessTypeID], [BusinessDescription]) VALUES (1, N'Limited By Shares')
INSERT [dbo].[BusinessType] ([BusinessTypeID], [BusinessDescription]) VALUES (2, N'Limited by Guarantee')
INSERT [dbo].[BusinessType] ([BusinessTypeID], [BusinessDescription]) VALUES (3, N'Unlimited by Shares')
INSERT [dbo].[BusinessType] ([BusinessTypeID], [BusinessDescription]) VALUES (4, N'Sole Proprietorship')
INSERT [dbo].[BusinessType] ([BusinessTypeID], [BusinessDescription]) VALUES (5, N'External Company')
INSERT [dbo].[BusinessType] ([BusinessTypeID], [BusinessDescription]) VALUES (6, N'Incorporated Partnership')
SET IDENTITY_INSERT [dbo].[BusinessType] OFF
SET IDENTITY_INSERT [dbo].[Currency] ON 

INSERT [dbo].[Currency] ([CurrencyID], [CurrencyName], [CurrencySymbol]) VALUES (12, N'Ghana Cedi', N'GHc ')
INSERT [dbo].[Currency] ([CurrencyID], [CurrencyName], [CurrencySymbol]) VALUES (13, N'Great Britain Pound', N'GBP ')
INSERT [dbo].[Currency] ([CurrencyID], [CurrencyName], [CurrencySymbol]) VALUES (14, N'United States Dollar', N'USD ')
SET IDENTITY_INSERT [dbo].[Currency] OFF
SET IDENTITY_INSERT [dbo].[FinancialYear] ON 

INSERT [dbo].[FinancialYear] ([FinancialYrID], [FinancialYr], [Description], [IsActive]) VALUES (1, N'2022-2023', N'Testing accounting period', 1)
SET IDENTITY_INSERT [dbo].[FinancialYear] OFF
SET IDENTITY_INSERT [dbo].[Item] ON 

INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (1, N'Computer Mouse', N'IT0001', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (2, N'GENERATING SET', N'MA0001', 3, 10, N'', 1, NULL, NULL, NULL, NULL, 4)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (3, N'STABILIZER', N'IT0002', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (4, N'UPS', N'IT0003', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (5, N'UPS BATTERIES', N'IT0004', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (6, N'CCTV', N'IT0005', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (7, N'LAPTOP', N'IT0006', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (8, N'DESKTOP', N'IT0007', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (9, N'ROUTER', N'IT0008', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (10, N'SWITCH', N'IT0009', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (11, N'DATA TAPE CATRIDGES', N'IT0010', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (12, N'FIREPROOF SAFE', N'OF0001', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (13, N'FILING CABINET', N'OF0002', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (14, N'GUEST CHAIRS - 4-IN-1', N'FI0001', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 3)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (15, N'GUEST CHAIRS - 3-IN-2', N'FI0002', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 3)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (16, N'COUNTING MACHINE', N'OF0003', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (17, N'PRINTER', N'OF0004', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (18, N'SCANNER', N'OF0005', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (19, N'PRINTER', N'OF0006', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (20, N'PRINTER/COPIER/SCANNER', N'OF0007', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (21, N'AIR CONDITION', N'OF0008', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (22, N'SWIVEL CHAIR', N'FI0003', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 3)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (23, N'OFFICE DESK', N'FI0004', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 3)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (24, N'WORK STATION', N'FI0005', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 3)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (25, N'VERTICAL BLINDS', N'OF0009', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (26, N'SECURITY DOOR', N'FI0006', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 3)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (27, N'CASH SAFE', N'OF0010', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (28, N'TELEPHONE', N'OF0011', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (29, N'MOBILE PHONE', N'OF0012', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (30, N'WATER DISPENSER', N'OF0013', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (31, N'COUNTERFEIT DETECTOR', N'OF0014', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (32, N'HYGROMETER', N'IT0011', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (33, N'SECURITY POST', N'FI0007', 20, 100, N'', 1, NULL, NULL, NULL, NULL, 3)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (34, N'MOTOR BIKE', N'MA0002', 3, 10, N'', 1, NULL, NULL, NULL, NULL, 4)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (35, N'VEHICLE - PICK UP', N'MA0003', 3, 10, N'', 1, NULL, NULL, NULL, NULL, 4)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (36, N'VEHICLE', N'MA0004', 3, 10, N'', 1, NULL, NULL, NULL, NULL, 4)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (37, N'MICROWAVE', N'OF0015', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (38, N'HEADSET WITH USB', N'OF0016', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (39, N'TELEVISION', N'OF0017', 5, 13, N'', 1, NULL, NULL, NULL, NULL, 2)
SET IDENTITY_INSERT [dbo].[Item] OFF
SET IDENTITY_INSERT [dbo].[ItemCategory] ON 

INSERT [dbo].[ItemCategory] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (1, N'IT Asset', N'Procured items which are IT-related')
INSERT [dbo].[ItemCategory] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (2, N'Office Equipment', N'Filing cabinets, Air Conditions, Counting machines, TVs, Printers, Copiers, etc')
INSERT [dbo].[ItemCategory] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (3, N'Fixtures and Fittings', N'Chairs, Tables, Workstations, etc')
INSERT [dbo].[ItemCategory] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (4, N'Machinery', N'Vehicles, Motorbikes, Gensets, etc')
SET IDENTITY_INSERT [dbo].[ItemCategory] OFF
SET IDENTITY_INSERT [dbo].[Module] ON 

INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (1, N'master', N'Master', CAST(N'2022-03-31' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (2, N'branchReq', N'Branch Requisition', CAST(N'2022-03-31' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (3, N'management', N'Procurement Management', CAST(N'2022-03-31' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (4, N'committee', N'Committee', CAST(N'2022-03-31' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (5, N'ext', N'Exit', CAST(N'2022-03-31' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (6, N'sysAdmin', N'System Administration', CAST(N'2022-03-31' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (7, N'committee', N'Committee', CAST(N'2022-03-31' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (8, N'config', N'System Configuration', CAST(N'2022-04-04' AS Date))
SET IDENTITY_INSERT [dbo].[Module] OFF
SET IDENTITY_INSERT [dbo].[PriorityType] ON 

INSERT [dbo].[PriorityType] ([PriorityID], [PriorityDescription]) VALUES (1, N'High')
INSERT [dbo].[PriorityType] ([PriorityID], [PriorityDescription]) VALUES (2, N'Medium')
INSERT [dbo].[PriorityType] ([PriorityID], [PriorityDescription]) VALUES (3, N'Low')
SET IDENTITY_INSERT [dbo].[PriorityType] OFF
SET IDENTITY_INSERT [dbo].[RequisitionStatus] ON 

INSERT [dbo].[RequisitionStatus] ([RequisitionStatusID], [RequisitionStatusDesc]) VALUES (1, N'Pending')
INSERT [dbo].[RequisitionStatus] ([RequisitionStatusID], [RequisitionStatusDesc]) VALUES (2, N'RFQ Sent')
INSERT [dbo].[RequisitionStatus] ([RequisitionStatusID], [RequisitionStatusDesc]) VALUES (3, N'Quotation Finalized')
INSERT [dbo].[RequisitionStatus] ([RequisitionStatusID], [RequisitionStatusDesc]) VALUES (4, N'LPO Generated')
INSERT [dbo].[RequisitionStatus] ([RequisitionStatusID], [RequisitionStatusDesc]) VALUES (5, N'Approved')
INSERT [dbo].[RequisitionStatus] ([RequisitionStatusID], [RequisitionStatusDesc]) VALUES (6, N'Central Purchasing Committee')
INSERT [dbo].[RequisitionStatus] ([RequisitionStatusID], [RequisitionStatusDesc]) VALUES (7, N'Vender selected')
SET IDENTITY_INSERT [dbo].[RequisitionStatus] OFF
SET IDENTITY_INSERT [dbo].[RequisitionType] ON 

INSERT [dbo].[RequisitionType] ([RequisitionTypeID], [RequisitionType], [RequisitionDescription]) VALUES (1, N'Purchase', N'')
INSERT [dbo].[RequisitionType] ([RequisitionTypeID], [RequisitionType], [RequisitionDescription]) VALUES (2, N'Contract', N'')
INSERT [dbo].[RequisitionType] ([RequisitionTypeID], [RequisitionType], [RequisitionDescription]) VALUES (3, N'Service', N'')
SET IDENTITY_INSERT [dbo].[RequisitionType] OFF
SET IDENTITY_INSERT [dbo].[SIUnit] ON 

INSERT [dbo].[SIUnit] ([SIUnitID], [Metric], [Measurement]) VALUES (1, N'Kg', N'Small Size (5Kg)')
SET IDENTITY_INSERT [dbo].[SIUnit] OFF
SET IDENTITY_INSERT [dbo].[UserModule] ON 

INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (1, N'nappiah', 5, CAST(N'2022-03-31' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (2, N'nappiah', 6, CAST(N'2022-03-31' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (3, N'nappiah', 3, CAST(N'2022-03-31' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (4, N'nappiah', 2, CAST(N'2022-03-31' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (5, N'nappiah', 1, CAST(N'2022-03-31' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (6, N'nappiah', 8, CAST(N'2022-04-04' AS Date))
SET IDENTITY_INSERT [dbo].[UserModule] OFF
SET IDENTITY_INSERT [dbo].[VendorType] ON 

INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (1, N'OUTDOOR AND INDOOR BRANDING,  ARTWORK & CREATIVES, SOUVENIRS')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (2, N'CORPORATE EVENTS')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (3, N'MEDIA ENGAGEMENT')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (4, N'FRIDAY WEAR & POLO SHIRTS')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (5, N'HOUSEHOLD APPLIANCE & AIR CONDITIONER')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (6, N'MONEY COUNTING MACHINES & COUNTERFEIT DETECTORS')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (7, N'OFFICE FURNITURE  & SAFES & SERVICING OF SAFES')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (8, N'COMPUTER NETWORKING & DATA CABLING')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (9, N'PCs, PRINTERS, COPIERS, LAPTOPS,CCTV AND ACCESSORIES')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (10, N'COPIER CARTRIDGE (DRUM &TONER)')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (11, N'UPS, Stabilizer, Computers and other IT Equipment Maintenance & Servicing of Pcs')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (12, N'MAST/TOWER FABRICATION AND MAINTENANCE')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (13, N'PRINTING OF BANK FORMS / STATIONERY')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (14, N'PRINTING – CHEQUE & WITHDRAWAL BOOKS')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (15, N'SERVER MAINTENANCE')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (16, N'STATIONERY')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (17, N'VEHICLES & MOTORBIKE - SERVICING/REPAIRS/MAINTENANCE')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (18, N'VEHICLE TYRES & BATTERIES')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (19, N'AIRCONDITIONER REPAIRS/SERVICING')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (20, N'VERTICAL BLINDS')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (21, N'CARPENTARY / PAINTING / MASONRY/ PLASTIC & METAL FABRICATION WORKS / GLASS WORKS & OTHERS')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (22, N'ELECTRICALS')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (23, N'FIRE EXTINGUISHERS & FIRE ALARM SYSTEM')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (24, N'GENERATING SET')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (25, N'PLUMBING WORKS')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (26, N'SECURITY SERVICES')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (27, N'TELEPHONE & PABX')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (28, N'WATER SUPPLY')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (29, N'COURIER')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (30, N'CLEANING & FUMIGATION & SANITIZATION')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (31, N'AUDITORS')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (32, N'LEGAL ADVISORS')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (33, N'FOOD/WATER/SNACKS')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (34, N'LODGING & HOTEL')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (35, N'INSURANCE')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (36, N'CREDIT BUREAU SERVICES')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (37, N'IT SERVICES')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (38, N'TRAINING INSTITUTES')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (39, N'MEDICALS FOR STAFF')
INSERT [dbo].[VendorType] ([VendorTypeID], [VendorDescription]) VALUES (40, N'TELCOS - INTERNET SUPPORT')
SET IDENTITY_INSERT [dbo].[VendorType] OFF
ALTER TABLE [dbo].[CommitteeMember]  WITH CHECK ADD  CONSTRAINT [FK_CommitteeMember_Committee] FOREIGN KEY([CommitteeID])
REFERENCES [dbo].[Committee] ([CommitteeID])
GO
ALTER TABLE [dbo].[CommitteeMember] CHECK CONSTRAINT [FK_CommitteeMember_Committee]
GO
ALTER TABLE [dbo].[Item]  WITH CHECK ADD  CONSTRAINT [FK_Item_ItemCategory] FOREIGN KEY([ItemCategoryID])
REFERENCES [dbo].[ItemCategory] ([CategoryID])
GO
ALTER TABLE [dbo].[Item] CHECK CONSTRAINT [FK_Item_ItemCategory]
GO
ALTER TABLE [dbo].[Item]  WITH CHECK ADD  CONSTRAINT [FK_Item_SIUnit] FOREIGN KEY([SIUnitID])
REFERENCES [dbo].[SIUnit] ([SIUnitID])
GO
ALTER TABLE [dbo].[Item] CHECK CONSTRAINT [FK_Item_SIUnit]
GO
ALTER TABLE [dbo].[Requisition]  WITH CHECK ADD  CONSTRAINT [FK_Requisition_Currency] FOREIGN KEY([CurrencyID])
REFERENCES [dbo].[Currency] ([CurrencyID])
GO
ALTER TABLE [dbo].[Requisition] CHECK CONSTRAINT [FK_Requisition_Currency]
GO
ALTER TABLE [dbo].[Requisition]  WITH CHECK ADD  CONSTRAINT [FK_Requisition_FinancialYear] FOREIGN KEY([FinancialYrID])
REFERENCES [dbo].[FinancialYear] ([FinancialYrID])
GO
ALTER TABLE [dbo].[Requisition] CHECK CONSTRAINT [FK_Requisition_FinancialYear]
GO
ALTER TABLE [dbo].[Requisition]  WITH CHECK ADD  CONSTRAINT [FK_Requisition_PriorityType] FOREIGN KEY([PriorityID])
REFERENCES [dbo].[PriorityType] ([PriorityID])
GO
ALTER TABLE [dbo].[Requisition] CHECK CONSTRAINT [FK_Requisition_PriorityType]
GO
ALTER TABLE [dbo].[Requisition]  WITH CHECK ADD  CONSTRAINT [FK_Requisition_RequisitionStatus] FOREIGN KEY([RequisitionStatusID])
REFERENCES [dbo].[RequisitionStatus] ([RequisitionStatusID])
GO
ALTER TABLE [dbo].[Requisition] CHECK CONSTRAINT [FK_Requisition_RequisitionStatus]
GO
ALTER TABLE [dbo].[Requisition]  WITH CHECK ADD  CONSTRAINT [FK_Requisition_RequisitionType] FOREIGN KEY([RequisitionTypeID])
REFERENCES [dbo].[RequisitionType] ([RequisitionTypeID])
GO
ALTER TABLE [dbo].[Requisition] CHECK CONSTRAINT [FK_Requisition_RequisitionType]
GO
ALTER TABLE [dbo].[Requisition]  WITH CHECK ADD  CONSTRAINT [FK_Requisition_Vendor] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[Vendor] ([VendorID])
GO
ALTER TABLE [dbo].[Requisition] CHECK CONSTRAINT [FK_Requisition_Vendor]
GO
ALTER TABLE [dbo].[UserModule]  WITH CHECK ADD  CONSTRAINT [FK_UserModule_Module] FOREIGN KEY([ModuleID])
REFERENCES [dbo].[Module] ([ModuleID])
GO
ALTER TABLE [dbo].[UserModule] CHECK CONSTRAINT [FK_UserModule_Module]
GO
ALTER TABLE [dbo].[Vendor]  WITH CHECK ADD  CONSTRAINT [FK_Vendor_BusinessType] FOREIGN KEY([CompanyBusinessTypeID])
REFERENCES [dbo].[BusinessType] ([BusinessTypeID])
GO
ALTER TABLE [dbo].[Vendor] CHECK CONSTRAINT [FK_Vendor_BusinessType]
GO
ALTER TABLE [dbo].[Vendor]  WITH CHECK ADD  CONSTRAINT [FK_Vendor_VendorType] FOREIGN KEY([VendorTypeID])
REFERENCES [dbo].[VendorType] ([VendorTypeID])
GO
ALTER TABLE [dbo].[Vendor] CHECK CONSTRAINT [FK_Vendor_VendorType]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the name of the currency' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Currency', @level2type=N'COLUMN',@level2name=N'CurrencyName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the symbol of the currency' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Currency', @level2type=N'COLUMN',@level2name=N'CurrencySymbol'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FinancialYear', @level2type=N'COLUMN',@level2name=N'FinancialYrID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the financial year in question. limited to char(9) eg: 2022-2023' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FinancialYear', @level2type=N'COLUMN',@level2name=N'FinancialYr'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the primary key of Items' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Item', @level2type=N'COLUMN',@level2name=N'ItemID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the name of the item' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Item', @level2type=N'COLUMN',@level2name=N'ItemName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the item code' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Item', @level2type=N'COLUMN',@level2name=N'ItemCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'minimum stock level' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Item', @level2type=N'COLUMN',@level2name=N'MinStockLevel'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the description for the item' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Item', @level2type=N'COLUMN',@level2name=N'ItemDescription'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the entity for which the log is being recorded (eg: VENDOR, PROCUREMENT, RFQ, etc)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Logger', @level2type=N'COLUMN',@level2name=N'LogEntity'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the event being logged (CREATE, UPDATE, DELETE, MODIFY, etc)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Logger', @level2type=N'COLUMN',@level2name=N'LogEvent'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the description of the logged event, including serialization of objects' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Logger', @level2type=N'COLUMN',@level2name=N'LogDescription'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the actor generating the log activity' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Logger', @level2type=N'COLUMN',@level2name=N'LogActor'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Module', @level2type=N'COLUMN',@level2name=N'ModuleID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'system name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Module', @level2type=N'COLUMN',@level2name=N'SystemName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'public name of the module' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Module', @level2type=N'COLUMN',@level2name=N'PublicName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the date it was assigned to user' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Module', @level2type=N'COLUMN',@level2name=N'DateAssigned'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key for the Priority lookup' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PriorityType', @level2type=N'COLUMN',@level2name=N'PriorityID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'priority description' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PriorityType', @level2type=N'COLUMN',@level2name=N'PriorityDescription'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Requisition', @level2type=N'COLUMN',@level2name=N'RequisitionID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'requisition number' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Requisition', @level2type=N'COLUMN',@level2name=N'RequisitionNo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the username of the requester' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Requisition', @level2type=N'COLUMN',@level2name=N'RequestedBy'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the ID of the financial year' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Requisition', @level2type=N'COLUMN',@level2name=N'FinancialYrID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the ID of the company..(usually the company in which system is installed)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Requisition', @level2type=N'COLUMN',@level2name=N'CompanyID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the department initiating the requisition' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Requisition', @level2type=N'COLUMN',@level2name=N'DepartmentID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the type of requisition (i.e. Purchase, Rent or Service)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Requisition', @level2type=N'COLUMN',@level2name=N'RequisitionTypeID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the location of the company' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Requisition', @level2type=N'COLUMN',@level2name=N'Location'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the currency in which requisition is being quoted' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Requisition', @level2type=N'COLUMN',@level2name=N'CurrencyID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the ID depicting the priority level for this requisition' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Requisition', @level2type=N'COLUMN',@level2name=N'PriorityID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the estimated total of the Requisition' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Requisition', @level2type=N'COLUMN',@level2name=N'RequisitionTotal'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the general purpose of the requisition' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Requisition', @level2type=N'COLUMN',@level2name=N'RequisitionDescription'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key for the table entity' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionItem', @level2type=N'COLUMN',@level2name=N'RequisitionItemID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the ID of the requisition' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionItem', @level2type=N'COLUMN',@level2name=N'RequisitionID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the ID of the item' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionItem', @level2type=N'COLUMN',@level2name=N'ItemID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the quantity being requisitioned' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionItem', @level2type=N'COLUMN',@level2name=N'Quantity'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the rate for the item being requisitioned' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionItem', @level2type=N'COLUMN',@level2name=N'ItemRate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Quantity x Rate gives ITEM AMOUNT' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionItem', @level2type=N'COLUMN',@level2name=N'ItemAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionStatus', @level2type=N'COLUMN',@level2name=N'RequisitionStatusID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the current status of a requisition' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionStatus', @level2type=N'COLUMN',@level2name=N'RequisitionStatusDesc'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key for the requisition' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionType', @level2type=N'COLUMN',@level2name=N'RequisitionTypeID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the type of requisition' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionType', @level2type=N'COLUMN',@level2name=N'RequisitionType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the description for the requistion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionType', @level2type=N'COLUMN',@level2name=N'RequisitionDescription'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SIUnit', @level2type=N'COLUMN',@level2name=N'SIUnitID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the SI unit metric' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SIUnit', @level2type=N'COLUMN',@level2name=N'Metric'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'measurement' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SIUnit', @level2type=N'COLUMN',@level2name=N'Measurement'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the name of the user' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserModule', @level2type=N'COLUMN',@level2name=N'UserName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the company registration number of the vendor' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Vendor', @level2type=N'COLUMN',@level2name=N'CompanyRegistrationNo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the contact of the company' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Vendor', @level2type=N'COLUMN',@level2name=N'CompanyContact'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the website or social media presence of the company/vendor' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Vendor', @level2type=N'COLUMN',@level2name=N'CompanyWebsite'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the email address of the company' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Vendor', @level2type=N'COLUMN',@level2name=N'CompanyEmailAddress'
GO
USE [master]
GO
ALTER DATABASE [EProcurementDb] SET  READ_WRITE 
GO
