USE [master]
GO
/****** Object:  Database [eProcurementDb]    Script Date: 4/27/2022 6:00:43 PM ******/
CREATE DATABASE [eProcurementDb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'eProcurementDb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\eProcurementDb.mdf' , SIZE = 30720KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'eProcurementDb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\eProcurementDb_log.ldf' , SIZE = 20480KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [eProcurementDb] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [eProcurementDb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [eProcurementDb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [eProcurementDb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [eProcurementDb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [eProcurementDb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [eProcurementDb] SET ARITHABORT OFF 
GO
ALTER DATABASE [eProcurementDb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [eProcurementDb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [eProcurementDb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [eProcurementDb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [eProcurementDb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [eProcurementDb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [eProcurementDb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [eProcurementDb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [eProcurementDb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [eProcurementDb] SET  DISABLE_BROKER 
GO
ALTER DATABASE [eProcurementDb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [eProcurementDb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [eProcurementDb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [eProcurementDb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [eProcurementDb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [eProcurementDb] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [eProcurementDb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [eProcurementDb] SET RECOVERY FULL 
GO
ALTER DATABASE [eProcurementDb] SET  MULTI_USER 
GO
ALTER DATABASE [eProcurementDb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [eProcurementDb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [eProcurementDb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [eProcurementDb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [eProcurementDb] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'eProcurementDb', N'ON'
GO
ALTER DATABASE [eProcurementDb] SET QUERY_STORE = OFF
GO
USE [eProcurementDb]
GO
/****** Object:  Table [dbo].[Branch]    Script Date: 4/27/2022 6:00:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Branch](
	[BranchID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Code] [nvarchar](5) NULL,
	[Alias] [nvarchar](255) NULL,
 CONSTRAINT [PK_Branch] PRIMARY KEY CLUSTERED 
(
	[BranchID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BusinessType]    Script Date: 4/27/2022 6:00:43 PM ******/
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
/****** Object:  Table [dbo].[Capex]    Script Date: 4/27/2022 6:00:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Capex](
	[CapexID] [int] IDENTITY(1,1) NOT NULL,
	[CapexItemID] [int] NULL,
	[CapexTypeID] [int] NULL,
	[EstimatedDeadline] [varchar](50) NULL,
	[QuantityRequested] [int] NULL,
	[QuantitySupplied] [int] NULL,
	[QuantityOutstanding] [int] NULL,
	[Justification] [varchar](max) NULL,
	[FinancialYrId] [int] NULL,
	[DId] [int] NULL,
 CONSTRAINT [PK_Capex] PRIMARY KEY CLUSTERED 
(
	[CapexID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Committee]    Script Date: 4/27/2022 6:00:43 PM ******/
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
/****** Object:  Table [dbo].[CommitteeMember]    Script Date: 4/27/2022 6:00:43 PM ******/
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
/****** Object:  Table [dbo].[Company]    Script Date: 4/27/2022 6:00:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Company](
	[CompanyID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyDescription] [varchar](50) NULL,
 CONSTRAINT [PK_Company] PRIMARY KEY CLUSTERED 
(
	[CompanyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Currency]    Script Date: 4/27/2022 6:00:43 PM ******/
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
/****** Object:  Table [dbo].[Department]    Script Date: 4/27/2022 6:00:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[DepartmentID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Head] [int] NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[DepartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FinancialYear]    Script Date: 4/27/2022 6:00:44 PM ******/
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
/****** Object:  Table [dbo].[Item]    Script Date: 4/27/2022 6:00:44 PM ******/
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
/****** Object:  Table [dbo].[ItemCategory]    Script Date: 4/27/2022 6:00:44 PM ******/
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
/****** Object:  Table [dbo].[Logger]    Script Date: 4/27/2022 6:00:44 PM ******/
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
/****** Object:  Table [dbo].[LPO]    Script Date: 4/27/2022 6:00:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LPO](
	[LPOID] [int] IDENTITY(1,1) NOT NULL,
	[RequisitionNo] [varchar](50) NULL,
	[VendorID] [int] NULL,
	[VAT] [numeric](9, 2) NULL,
	[PurchaseOrderDate] [date] NULL,
	[ExpectedDeliveryDate] [date] NULL,
	[ShippingAddress] [varchar](200) NULL,
	[PaymentTerm] [varchar](50) NULL,
	[OtherTermsAndConditions] [varchar](200) NULL,
	[LPOStatusID] [int] NULL,
	[TotAmt] [numeric](18, 2) NULL,
	[NetAmt] [numeric](18, 2) NULL,
	[LPONo] [varchar](50) NULL,
	[ProcurementTypeId] [int] NULL,
 CONSTRAINT [PK_LPO] PRIMARY KEY CLUSTERED 
(
	[LPOID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LPOApproval]    Script Date: 4/27/2022 6:00:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LPOApproval](
	[ApprovalID] [int] IDENTITY(1,1) NOT NULL,
	[LPO_ID] [int] NULL,
	[PersonTag] [varchar](50) NULL,
	[PersonName] [varchar](max) NULL,
	[ApprovalDate] [date] NULL,
	[ApprovalStatus] [int] NULL,
	[ApprovalComments] [varchar](max) NULL,
 CONSTRAINT [PK_LPOApproval] PRIMARY KEY CLUSTERED 
(
	[ApprovalID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Module]    Script Date: 4/27/2022 6:00:44 PM ******/
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
/****** Object:  Table [dbo].[NotificationGroup]    Script Date: 4/27/2022 6:00:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NotificationGroup](
	[NotificationGroupID] [int] IDENTITY(1,1) NOT NULL,
	[NotificationGroupName] [varchar](100) NULL,
	[NotificationMailString] [varchar](max) NULL,
	[NotificationDescription] [varchar](200) NULL,
 CONSTRAINT [PK_NotificationGroup] PRIMARY KEY CLUSTERED 
(
	[NotificationGroupID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NotificationList]    Script Date: 4/27/2022 6:00:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NotificationList](
	[NotificationID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[EmailAddress] [varchar](60) NULL,
	[tag] [varchar](200) NULL,
	[isActive] [int] NULL,
 CONSTRAINT [PK_NotificationList] PRIMARY KEY CLUSTERED 
(
	[NotificationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PFNotificationList]    Script Date: 4/27/2022 6:00:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PFNotificationList](
	[PFNotificationListID] [int] IDENTITY(1,1) NOT NULL,
	[PFID] [int] NOT NULL,
	[NotificationGroupID] [int] NULL,
 CONSTRAINT [PK_PFNotificationList] PRIMARY KEY CLUSTERED 
(
	[PFNotificationListID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Position]    Script Date: 4/27/2022 6:00:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Position](
	[PositionID] [int] IDENTITY(1,1) NOT NULL,
	[Designation] [varchar](100) NULL,
 CONSTRAINT [PK_Position] PRIMARY KEY CLUSTERED 
(
	[PositionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PriorityType]    Script Date: 4/27/2022 6:00:44 PM ******/
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
/****** Object:  Table [dbo].[ProcessFlow]    Script Date: 4/27/2022 6:00:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProcessFlow](
	[ProcessFlowID] [int] IDENTITY(1,1) NOT NULL,
	[ProcurementTypeId] [int] NULL,
	[Limit] [numeric](18, 2) NULL,
	[ProcessFlowOrder] [int] NULL,
 CONSTRAINT [PK_ProcessFlow] PRIMARY KEY CLUSTERED 
(
	[ProcessFlowID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProcessFlowList]    Script Date: 4/27/2022 6:00:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProcessFlowList](
	[ProcessFlowListID] [int] IDENTITY(1,1) NOT NULL,
	[ProcessFlowID] [int] NULL,
	[Flow] [varchar](max) NULL,
 CONSTRAINT [PK_ProcessFlowList] PRIMARY KEY CLUSTERED 
(
	[ProcessFlowListID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProcurementType]    Script Date: 4/27/2022 6:00:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProcurementType](
	[ProcurementTypeID] [int] IDENTITY(1,1) NOT NULL,
	[ProcurementDescription] [varchar](200) NULL,
 CONSTRAINT [PK_ProcurementType] PRIMARY KEY CLUSTERED 
(
	[ProcurementTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profile]    Script Date: 4/27/2022 6:00:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profile](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[profileName] [varchar](50) NULL,
	[profileContent] [varchar](500) NULL,
	[inUse] [int] NULL,
 CONSTRAINT [PK_Profile_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Requisition]    Script Date: 4/27/2022 6:00:44 PM ******/
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
	[isNotif] [int] NULL,
 CONSTRAINT [PK_Requisition] PRIMARY KEY CLUSTERED 
(
	[RequisitionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RequisitionFile]    Script Date: 4/27/2022 6:00:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RequisitionFile](
	[RequisitionFileID] [int] IDENTITY(1,1) NOT NULL,
	[RequisitionID] [int] NULL,
	[RequisitionFileDescription] [varchar](200) NULL,
	[RequisitionFileName] [binary](50) NULL,
 CONSTRAINT [PK_RequisitionFile] PRIMARY KEY CLUSTERED 
(
	[RequisitionFileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RequisitionItem]    Script Date: 4/27/2022 6:00:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RequisitionItem](
	[RequisitionItemID] [int] IDENTITY(1,1) NOT NULL,
	[RequisitionID] [int] NULL,
	[ItemID] [int] NULL,
	[Quantity] [int] NULL,
	[Narration] [varchar](50) NULL,
	[FinApprovalStatus] [int] NULL,
	[Amt] [numeric](18, 2) NULL,
	[LPOID] [int] NULL,
 CONSTRAINT [PK_RequisitionItem] PRIMARY KEY CLUSTERED 
(
	[RequisitionItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RequisitionStatus]    Script Date: 4/27/2022 6:00:44 PM ******/
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
/****** Object:  Table [dbo].[RequisitionType]    Script Date: 4/27/2022 6:00:44 PM ******/
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
/****** Object:  Table [dbo].[SIUnit]    Script Date: 4/27/2022 6:00:44 PM ******/
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
/****** Object:  Table [dbo].[UserModule]    Script Date: 4/27/2022 6:00:44 PM ******/
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
/****** Object:  Table [dbo].[Usr]    Script Date: 4/27/2022 6:00:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usr](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[surname] [varchar](50) NULL,
	[firstname] [varchar](50) NULL,
	[othernames] [varchar](200) NULL,
	[usrname] [varchar](60) NULL,
	[usrpassword] [varchar](300) NULL,
	[deptId] [int] NULL,
	[isActive] [int] NULL,
	[isLogged] [int] NULL,
	[isAD] [int] NULL,
	[isAdmin] [int] NULL,
	[uProfile] [varchar](50) NULL,
	[tag] [varchar](50) NULL,
 CONSTRAINT [PK_Usr] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vendor]    Script Date: 4/27/2022 6:00:44 PM ******/
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
/****** Object:  Table [dbo].[VendorType]    Script Date: 4/27/2022 6:00:44 PM ******/
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
SET IDENTITY_INSERT [dbo].[Branch] ON 

INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (1, N'KANESHIE', N'106', N'PAN-AFRICAN KANESHIE')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (2, N'HEAD OFFICE', N'101', N'PAN-AFRICAN HEAD OFFICE')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (3, N'AGBOGBLOSHIE', N'104', N'PAN-AFRICAN AGBOGBLOSHIE')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (4, N'MAMOBI', N'107', N'PAN-AFRICAN MAAMOBI')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (5, N'ABEKA LAPAZ', N'102', N'PAN-AFRICAN ABEKALAPAZ')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (6, N'TUDU', N'103', N'PAN-AFRICAN TUDU')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (7, N'McCARTHY HILL', N'105', N'PAN-AFRICAN McCARTHY HILL')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (8, N'KENYASI', N'115', N'PAN-AFRICAN KENYASI')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (9, N'MADINA', N'117', N'PAN-AFRICAN MADINA')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (10, N'ASHANTI NEW TOWN', N'113', N'PAN-AFRICAN ASHTOWN')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (12, N'GOASO', N'116', N'PAN-AFRICAN GOASO')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (13, N'NSAWAM', N'112', N'PAN-AFRICAN NSAWAM')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (14, N'ASHIAMAN', N'108', N'PAN-AFRICAN ASHIAMAN')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (15, N'BAWJIASE', N'109', N'PAN-AFRICAN BAWJIASE')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (16, N'SPINTEX', N'110', N'PAN-AFRICAN SPINTEX')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (17, N'TAFO', N'114', N'PAN-AFRICAN KSI TAFO')
INSERT [dbo].[Branch] ([BranchID], [Name], [Code], [Alias]) VALUES (18, N'RIDGE', N'111', N'PAN-AFRICAN RIDGE')
SET IDENTITY_INSERT [dbo].[Branch] OFF
GO
SET IDENTITY_INSERT [dbo].[BusinessType] ON 

INSERT [dbo].[BusinessType] ([BusinessTypeID], [BusinessDescription]) VALUES (1, N'Limited By Shares')
INSERT [dbo].[BusinessType] ([BusinessTypeID], [BusinessDescription]) VALUES (2, N'Limited by Guarantee')
INSERT [dbo].[BusinessType] ([BusinessTypeID], [BusinessDescription]) VALUES (3, N'Unlimited by Shares')
INSERT [dbo].[BusinessType] ([BusinessTypeID], [BusinessDescription]) VALUES (4, N'Sole Proprietorship')
INSERT [dbo].[BusinessType] ([BusinessTypeID], [BusinessDescription]) VALUES (5, N'External Company')
INSERT [dbo].[BusinessType] ([BusinessTypeID], [BusinessDescription]) VALUES (6, N'Incorporated Partnership')
SET IDENTITY_INSERT [dbo].[BusinessType] OFF
GO
SET IDENTITY_INSERT [dbo].[Capex] ON 

INSERT [dbo].[Capex] ([CapexID], [CapexItemID], [CapexTypeID], [EstimatedDeadline], [QuantityRequested], [QuantitySupplied], [QuantityOutstanding], [Justification], [FinancialYrId], [DId]) VALUES (3, 6, 1, N'March', 1, 0, 1, N'5', 1, 3)
INSERT [dbo].[Capex] ([CapexID], [CapexItemID], [CapexTypeID], [EstimatedDeadline], [QuantityRequested], [QuantitySupplied], [QuantityOutstanding], [Justification], [FinancialYrId], [DId]) VALUES (4, 21, 2, N'June', 2, 0, 2, N'Banking Hall', 1, 6)
INSERT [dbo].[Capex] ([CapexID], [CapexItemID], [CapexTypeID], [EstimatedDeadline], [QuantityRequested], [QuantitySupplied], [QuantityOutstanding], [Justification], [FinancialYrId], [DId]) VALUES (5, 8, 1, N'July', 5, 0, 5, N'Desktop for Loan Officers', 1, 6)
INSERT [dbo].[Capex] ([CapexID], [CapexItemID], [CapexTypeID], [EstimatedDeadline], [QuantityRequested], [QuantitySupplied], [QuantityOutstanding], [Justification], [FinancialYrId], [DId]) VALUES (6, 7, 1, N'November', 1, 0, 1, N'Branch Manager', 1, 6)
INSERT [dbo].[Capex] ([CapexID], [CapexItemID], [CapexTypeID], [EstimatedDeadline], [QuantityRequested], [QuantitySupplied], [QuantityOutstanding], [Justification], [FinancialYrId], [DId]) VALUES (7, 18, 2, N'September', 1, 0, 1, N'Disbursement Desk', 1, 6)
SET IDENTITY_INSERT [dbo].[Capex] OFF
GO
SET IDENTITY_INSERT [dbo].[Committee] ON 

INSERT [dbo].[Committee] ([CommitteeID], [CommitteeName], [CommitteeDescription]) VALUES (1, N'CENTRAL PURCHASING COMMITTEE', N'CPC')
INSERT [dbo].[Committee] ([CommitteeID], [CommitteeName], [CommitteeDescription]) VALUES (2, N'BRANCH OPENING COMMITTEE (BOC)', N'BOC')
INSERT [dbo].[Committee] ([CommitteeID], [CommitteeName], [CommitteeDescription]) VALUES (3, N'IT PURCHASING COMMITTEE', N'IPC')
INSERT [dbo].[Committee] ([CommitteeID], [CommitteeName], [CommitteeDescription]) VALUES (4, N'IT STEERING COMMITTEE', N' ')
INSERT [dbo].[Committee] ([CommitteeID], [CommitteeName], [CommitteeDescription]) VALUES (5, N'test', N'testn')
SET IDENTITY_INSERT [dbo].[Committee] OFF
GO
SET IDENTITY_INSERT [dbo].[CommitteeMember] ON 

INSERT [dbo].[CommitteeMember] ([CommitteeMemberID], [CommitteeID], [LastName], [FirstName], [OtherNames], [PositionID], [EmailAddress], [active]) VALUES (1, 1, N'Annan', N'Pascal', N'Mensah Tete', 1, N'pannan@panafricansl.com', 1)
INSERT [dbo].[CommitteeMember] ([CommitteeMemberID], [CommitteeID], [LastName], [FirstName], [OtherNames], [PositionID], [EmailAddress], [active]) VALUES (2, 1, N'Afful', N'Benedict', N'enter other names', 4, N'abafful@panafricansl.com', 1)
INSERT [dbo].[CommitteeMember] ([CommitteeMemberID], [CommitteeID], [LastName], [FirstName], [OtherNames], [PositionID], [EmailAddress], [active]) VALUES (4, 2, N'Nana', N'Appiah', N'Ofosu Gyeabour', 3, N'nappiah@panafricansl.com', 1)
INSERT [dbo].[CommitteeMember] ([CommitteeMemberID], [CommitteeID], [LastName], [FirstName], [OtherNames], [PositionID], [EmailAddress], [active]) VALUES (5, 1, N'Seth', N'Ocansey', N'Paa kow', 1, N'sethocansey@gmail.com', 0)
SET IDENTITY_INSERT [dbo].[CommitteeMember] OFF
GO
SET IDENTITY_INSERT [dbo].[Company] ON 

INSERT [dbo].[Company] ([CompanyID], [CompanyDescription]) VALUES (1, N'PAN AFRICAN SAVINGS AND LOANS')
SET IDENTITY_INSERT [dbo].[Company] OFF
GO
SET IDENTITY_INSERT [dbo].[Currency] ON 

INSERT [dbo].[Currency] ([CurrencyID], [CurrencyName], [CurrencySymbol]) VALUES (1, N'Ghana Cedi', N'GHc ')
SET IDENTITY_INSERT [dbo].[Currency] OFF
GO
SET IDENTITY_INSERT [dbo].[Department] ON 

INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (1, N'Internal Audit', 190)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (2, N'Operations', 405)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (3, N'IT', 118)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (4, N'HR', 103)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (5, N'Internal Control', 5)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (6, N'Finance', 181)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (7, N'Risk', 201)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (8, N'Recovery', 473)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (9, N'Legal', 640)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (10, N'Corporate Affairs, Research & Customer Exp.', 119)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (11, N'E-Business and Remittances', 10)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (12, N'Compliance', 29)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (13, N'Credit', 89)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (14, N'TPU', 25)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (15, N'Deposit Mobilization', 272)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (16, N'BUSINESS DEVELOPMENT', 738)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (17, N'PAN-AFRICAN KANESHIE', 106)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (18, N'PAN-AFRICAN HEAD OFFICE', 101)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (19, N'PAN-AFRICAN AGBOGBLOSHIE', 104)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (20, N'PAN-AFRICAN MAAMOBI', 107)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (21, N'PAN-AFRICAN ABEKALAPAZ', 102)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (22, N'PAN-AFRICAN TUDU', 103)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (23, N'PAN-AFRICAN McCARTHY HILL', 105)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (24, N'PAN-AFRICAN KENYASI', 115)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (25, N'PAN-AFRICAN MADINA', 117)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (26, N'PAN-AFRICAN ASHTOWN', 113)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (27, N'PAN-AFRICAN GOASO', 116)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (28, N'PAN-AFRICAN NSAWAM', 112)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (29, N'PAN-AFRICAN ASHIAMAN', 108)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (30, N'PAN-AFRICAN BAWJIASE', 109)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (31, N'PAN-AFRICAN SPINTEX', 110)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (32, N'PAN-AFRICAN KSI TAFO', 114)
INSERT [dbo].[Department] ([DepartmentID], [Name], [Head]) VALUES (33, N'PAN-AFRICAN RIDGE', 111)
SET IDENTITY_INSERT [dbo].[Department] OFF
GO
SET IDENTITY_INSERT [dbo].[FinancialYear] ON 

INSERT [dbo].[FinancialYear] ([FinancialYrID], [FinancialYr], [Description], [IsActive]) VALUES (1, N'2022-2023', N'Testing accounting period', 1)
SET IDENTITY_INSERT [dbo].[FinancialYear] OFF
GO
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
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (40, N'LAND', N'LA-0001', 1, 2, N'Land', 2, NULL, NULL, NULL, NULL, 5)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (41, N'BUILDINGS AND RENOVATION', N'LA-0002', 1, 2, N'Renovations', 2, NULL, NULL, NULL, NULL, 5)
INSERT [dbo].[Item] ([ItemID], [ItemName], [ItemCode], [MinStockLevel], [MaxStockLevel], [ItemDescription], [SIUnitID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate], [ItemCategoryID]) VALUES (42, N'LEASEHOLD IMPROVEMENTS', N'LA-0003', 1, 2, N'Lease improvements/maintenance', 2, NULL, NULL, NULL, NULL, 5)
SET IDENTITY_INSERT [dbo].[Item] OFF
GO
SET IDENTITY_INSERT [dbo].[ItemCategory] ON 

INSERT [dbo].[ItemCategory] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (1, N'IT Asset', N'Procured items which are IT-related')
INSERT [dbo].[ItemCategory] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (2, N'Office Equipment', N'Filing cabinets, Air Conditions, Counting machines, TVs, Printers, Copiers, etc')
INSERT [dbo].[ItemCategory] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (3, N'Fixtures and Fittings', N'Chairs, Tables, Workstations, etc')
INSERT [dbo].[ItemCategory] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (4, N'Machinery', N'Vehicles, Motorbikes, Gensets, etc')
INSERT [dbo].[ItemCategory] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (5, N'Land and Buildings', N'')
SET IDENTITY_INSERT [dbo].[ItemCategory] OFF
GO
SET IDENTITY_INSERT [dbo].[LPO] ON 

INSERT [dbo].[LPO] ([LPOID], [RequisitionNo], [VendorID], [VAT], [PurchaseOrderDate], [ExpectedDeliveryDate], [ShippingAddress], [PaymentTerm], [OtherTermsAndConditions], [LPOStatusID], [TotAmt], [NetAmt], [LPONo], [ProcurementTypeId]) VALUES (3, N'REQN-IT-20220426-0001', 39, CAST(5.50 AS Numeric(9, 2)), CAST(N'2022-04-26' AS Date), CAST(N'2022-04-29' AS Date), N'Mamobi', N' Accra', N'Cheque', 4, CAST(10000.00 AS Numeric(18, 2)), CAST(9999.94 AS Numeric(18, 2)), N'LPO-IT-20220426-0001-0001', 3)
INSERT [dbo].[LPO] ([LPOID], [RequisitionNo], [VendorID], [VAT], [PurchaseOrderDate], [ExpectedDeliveryDate], [ShippingAddress], [PaymentTerm], [OtherTermsAndConditions], [LPOStatusID], [TotAmt], [NetAmt], [LPONo], [ProcurementTypeId]) VALUES (4, N'REQN-IT-20220427-0002', 26, CAST(5.50 AS Numeric(9, 2)), CAST(N'2022-04-28' AS Date), CAST(N'2022-05-11' AS Date), N'Ridge', N' Accra', N'Cheque', 4, CAST(2780.00 AS Numeric(18, 2)), CAST(2779.94 AS Numeric(18, 2)), N'LPO-IT-20220427-0002-0002', 2)
SET IDENTITY_INSERT [dbo].[LPO] OFF
GO
SET IDENTITY_INSERT [dbo].[LPOApproval] ON 

INSERT [dbo].[LPOApproval] ([ApprovalID], [LPO_ID], [PersonTag], [PersonName], [ApprovalDate], [ApprovalStatus], [ApprovalComments]) VALUES (1, 3, N'Head-OP', NULL, CAST(N'2022-04-26' AS Date), 1, N'I hereby approve this requisition. Kindly get it done. Thanks.')
INSERT [dbo].[LPOApproval] ([ApprovalID], [LPO_ID], [PersonTag], [PersonName], [ApprovalDate], [ApprovalStatus], [ApprovalComments]) VALUES (2, 4, N'Administrative Officer', N'abi abi abi', CAST(N'2022-04-27' AS Date), 1, N'This procurement has been approved on the 27th day of April, 2022, by Abigail.')
SET IDENTITY_INSERT [dbo].[LPOApproval] OFF
GO
SET IDENTITY_INSERT [dbo].[Module] ON 

INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (1, N'master', N'Master', CAST(N'2022-03-31' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (2, N'branchReq', N'Branch Requisition', CAST(N'2022-03-31' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (3, N'management', N'Procurement Management', CAST(N'2022-03-31' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (4, N'committee', N'Committee', CAST(N'2022-03-31' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (5, N'ext', N'Exit', CAST(N'2022-03-31' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (7, N'finControl', N'Financial Approval', CAST(N'2022-03-31' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (8, N'config', N'System Configuration', CAST(N'2022-04-04' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (9, N'capex', N'CAPEX', CAST(N'2022-04-16' AS Date))
INSERT [dbo].[Module] ([ModuleID], [SystemName], [PublicName], [DateAssigned]) VALUES (10, N'approval', N'Procurement Approvals', CAST(N'2022-04-20' AS Date))
SET IDENTITY_INSERT [dbo].[Module] OFF
GO
SET IDENTITY_INSERT [dbo].[NotificationGroup] ON 

INSERT [dbo].[NotificationGroup] ([NotificationGroupID], [NotificationGroupName], [NotificationMailString], [NotificationDescription]) VALUES (1, N'IT Group', N'pannan@panafricansl.com, nappiah@panafricansl.com,abafful@panafricansl.com', N'IT Group')
SET IDENTITY_INSERT [dbo].[NotificationGroup] OFF
GO
SET IDENTITY_INSERT [dbo].[PFNotificationList] ON 

INSERT [dbo].[PFNotificationList] ([PFNotificationListID], [PFID], [NotificationGroupID]) VALUES (1, 1, 1)
INSERT [dbo].[PFNotificationList] ([PFNotificationListID], [PFID], [NotificationGroupID]) VALUES (2, 1, 1)
SET IDENTITY_INSERT [dbo].[PFNotificationList] OFF
GO
SET IDENTITY_INSERT [dbo].[Position] ON 

INSERT [dbo].[Position] ([PositionID], [Designation]) VALUES (1, N'IT Head')
INSERT [dbo].[Position] ([PositionID], [Designation]) VALUES (2, N'Managing Director')
INSERT [dbo].[Position] ([PositionID], [Designation]) VALUES (3, N'Deputy Managing Director')
INSERT [dbo].[Position] ([PositionID], [Designation]) VALUES (4, N'Financial Controller')
INSERT [dbo].[Position] ([PositionID], [Designation]) VALUES (5, N'Head-OP')
INSERT [dbo].[Position] ([PositionID], [Designation]) VALUES (6, N'Administrative Officer')
SET IDENTITY_INSERT [dbo].[Position] OFF
GO
SET IDENTITY_INSERT [dbo].[PriorityType] ON 

INSERT [dbo].[PriorityType] ([PriorityID], [PriorityDescription]) VALUES (1, N'High')
INSERT [dbo].[PriorityType] ([PriorityID], [PriorityDescription]) VALUES (2, N'Medium')
INSERT [dbo].[PriorityType] ([PriorityID], [PriorityDescription]) VALUES (3, N'Low')
SET IDENTITY_INSERT [dbo].[PriorityType] OFF
GO
SET IDENTITY_INSERT [dbo].[ProcessFlow] ON 

INSERT [dbo].[ProcessFlow] ([ProcessFlowID], [ProcurementTypeId], [Limit], [ProcessFlowOrder]) VALUES (1, 1, CAST(100.00 AS Numeric(18, 2)), 1)
INSERT [dbo].[ProcessFlow] ([ProcessFlowID], [ProcurementTypeId], [Limit], [ProcessFlowOrder]) VALUES (2, 2, CAST(3000.00 AS Numeric(18, 2)), 2)
INSERT [dbo].[ProcessFlow] ([ProcessFlowID], [ProcurementTypeId], [Limit], [ProcessFlowOrder]) VALUES (3, 3, CAST(10000.00 AS Numeric(18, 2)), 3)
INSERT [dbo].[ProcessFlow] ([ProcessFlowID], [ProcurementTypeId], [Limit], [ProcessFlowOrder]) VALUES (4, 4, CAST(80000.00 AS Numeric(18, 2)), 4)
INSERT [dbo].[ProcessFlow] ([ProcessFlowID], [ProcurementTypeId], [Limit], [ProcessFlowOrder]) VALUES (5, 5, CAST(80000.00 AS Numeric(18, 2)), 5)
SET IDENTITY_INSERT [dbo].[ProcessFlow] OFF
GO
SET IDENTITY_INSERT [dbo].[ProcessFlowList] ON 

INSERT [dbo].[ProcessFlowList] ([ProcessFlowListID], [ProcessFlowID], [Flow]) VALUES (1, 1, N'Branch Administrator|Branch Manager')
INSERT [dbo].[ProcessFlowList] ([ProcessFlowListID], [ProcessFlowID], [Flow]) VALUES (2, 2, N'Administrative Officer|Head-HRM|DMD')
INSERT [dbo].[ProcessFlowList] ([ProcessFlowListID], [ProcessFlowID], [Flow]) VALUES (3, 3, N'Branch|Head-OP|DMD')
INSERT [dbo].[ProcessFlowList] ([ProcessFlowListID], [ProcessFlowID], [Flow]) VALUES (4, 4, N'Branch Opening Committee|Central Purchasing Committee=80000|Managing Director=100000|EXCOM > 100000|Board')
INSERT [dbo].[ProcessFlowList] ([ProcessFlowListID], [ProcessFlowID], [Flow]) VALUES (5, 5, N'IT Purchasing Committee|IT Steering Committee=80000|Managing Director=100000|EXCOM > 100000|Board')
SET IDENTITY_INSERT [dbo].[ProcessFlowList] OFF
GO
SET IDENTITY_INSERT [dbo].[ProcurementType] ON 

INSERT [dbo].[ProcurementType] ([ProcurementTypeID], [ProcurementDescription]) VALUES (1, N'BRANCH PURCHASES')
INSERT [dbo].[ProcurementType] ([ProcurementTypeID], [ProcurementDescription]) VALUES (2, N'HEAD OFFICE ROUTINE ADMIN PURCHASES')
INSERT [dbo].[ProcurementType] ([ProcurementTypeID], [ProcurementDescription]) VALUES (3, N'BRANCH RECOMMENDED PURCHASES')
INSERT [dbo].[ProcurementType] ([ProcurementTypeID], [ProcurementDescription]) VALUES (4, N'BRANCH OPENING PURCHASES')
INSERT [dbo].[ProcurementType] ([ProcurementTypeID], [ProcurementDescription]) VALUES (5, N'IT EQUIPMENT PURCHASES')
SET IDENTITY_INSERT [dbo].[ProcurementType] OFF
GO
SET IDENTITY_INSERT [dbo].[Profile] ON 

INSERT [dbo].[Profile] ([Id], [profileName], [profileContent], [inUse]) VALUES (1, N'testProfile', N'ext,config,master,capex', 1)
INSERT [dbo].[Profile] ([Id], [profileName], [profileContent], [inUse]) VALUES (2, N'Committee_Module', N'committee,ext,', 1)
INSERT [dbo].[Profile] ([Id], [profileName], [profileContent], [inUse]) VALUES (3, N'Approval_Module', N'approval,ext,', 1)
INSERT [dbo].[Profile] ([Id], [profileName], [profileContent], [inUse]) VALUES (4, N'testing_module', N'branchReq,ext,master,', 1)
INSERT [dbo].[Profile] ([Id], [profileName], [profileContent], [inUse]) VALUES (5, N'something_here', N'branchReq,capex,committee,master', 1)
INSERT [dbo].[Profile] ([Id], [profileName], [profileContent], [inUse]) VALUES (6, N'Jah!!!', N'capex,approval,management,config,ext', 1)
INSERT [dbo].[Profile] ([Id], [profileName], [profileContent], [inUse]) VALUES (7, N'FnMgrProfile', N'finControl,ext', 1)
INSERT [dbo].[Profile] ([Id], [profileName], [profileContent], [inUse]) VALUES (8, N'AdminMgr', N'management,ext', 1)
INSERT [dbo].[Profile] ([Id], [profileName], [profileContent], [inUse]) VALUES (9, N'AdminMgr2', N'branchReq,capex,approval,management,ext', 1)
INSERT [dbo].[Profile] ([Id], [profileName], [profileContent], [inUse]) VALUES (10, N'SysAdmin', N'branchReq,committee,capex,ext,finControl,master,approval,management,config', 1)
INSERT [dbo].[Profile] ([Id], [profileName], [profileContent], [inUse]) VALUES (11, N'finManagerProfile', N'capex,ext,finControl', 1)
SET IDENTITY_INSERT [dbo].[Profile] OFF
GO
SET IDENTITY_INSERT [dbo].[Requisition] ON 

INSERT [dbo].[Requisition] ([RequisitionID], [RequisitionNo], [RequestedBy], [FinancialYrID], [CompanyID], [DepartmentID], [RequisitionTypeID], [Location], [CurrencyID], [PriorityID], [RequisitionTotal], [RequisitionDescription], [RequisitionStatusID], [CreatedBy], [CreatedDate], [AuthorizedBy], [AuthorizedDate], [LastUpdatedBy], [LastUpdatedDate], [isNotif]) VALUES (2, N'REQN-IT-20220426-0001', N'nappiah', 1, 1, 3, 1, N'Mamobi', 1, 1, NULL, N'urgent!!', 3, N'nappiah', CAST(N'2022-04-26' AS Date), NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[Requisition] ([RequisitionID], [RequisitionNo], [RequestedBy], [FinancialYrID], [CompanyID], [DepartmentID], [RequisitionTypeID], [Location], [CurrencyID], [PriorityID], [RequisitionTotal], [RequisitionDescription], [RequisitionStatusID], [CreatedBy], [CreatedDate], [AuthorizedBy], [AuthorizedDate], [LastUpdatedBy], [LastUpdatedDate], [isNotif]) VALUES (3, N'REQN-IT-20220427-0001', N'nappiah', 1, 1, 3, 1, N'Kejetia', 1, 1, NULL, N'Hello Abigail,
This is urgent.

Treat as such.', 2, N'nappiah', CAST(N'2022-04-27' AS Date), NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[Requisition] ([RequisitionID], [RequisitionNo], [RequestedBy], [FinancialYrID], [CompanyID], [DepartmentID], [RequisitionTypeID], [Location], [CurrencyID], [PriorityID], [RequisitionTotal], [RequisitionDescription], [RequisitionStatusID], [CreatedBy], [CreatedDate], [AuthorizedBy], [AuthorizedDate], [LastUpdatedBy], [LastUpdatedDate], [isNotif]) VALUES (4, N'REQN-IT-20220427-0002', N'nappiah', 1, 1, 3, 2, N'Ablekuma', 1, 2, NULL, N'Urgent Please!!!', 3, N'nappiah', CAST(N'2022-04-27' AS Date), NULL, NULL, NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[Requisition] OFF
GO
SET IDENTITY_INSERT [dbo].[RequisitionItem] ON 

INSERT [dbo].[RequisitionItem] ([RequisitionItemID], [RequisitionID], [ItemID], [Quantity], [Narration], [FinApprovalStatus], [Amt], [LPOID]) VALUES (3, 2, 27, 1, N'1 units of CASH SAFE', 3, CAST(2000.00 AS Numeric(18, 2)), 3)
INSERT [dbo].[RequisitionItem] ([RequisitionItemID], [RequisitionID], [ItemID], [Quantity], [Narration], [FinApprovalStatus], [Amt], [LPOID]) VALUES (4, 2, 4, 1, N'1 units of UPS', 3, CAST(6000.00 AS Numeric(18, 2)), 3)
INSERT [dbo].[RequisitionItem] ([RequisitionItemID], [RequisitionID], [ItemID], [Quantity], [Narration], [FinApprovalStatus], [Amt], [LPOID]) VALUES (5, 2, 5, 2, N'2 units of UPS BATTERIES', 3, CAST(2000.00 AS Numeric(18, 2)), 3)
INSERT [dbo].[RequisitionItem] ([RequisitionItemID], [RequisitionID], [ItemID], [Quantity], [Narration], [FinApprovalStatus], [Amt], [LPOID]) VALUES (6, 3, 23, 2, N'2 units of OFFICE DESK', 2, NULL, NULL)
INSERT [dbo].[RequisitionItem] ([RequisitionItemID], [RequisitionID], [ItemID], [Quantity], [Narration], [FinApprovalStatus], [Amt], [LPOID]) VALUES (7, 3, 17, 1, N'1 units of PRINTER', 2, NULL, NULL)
INSERT [dbo].[RequisitionItem] ([RequisitionItemID], [RequisitionID], [ItemID], [Quantity], [Narration], [FinApprovalStatus], [Amt], [LPOID]) VALUES (8, 4, 21, 1, N'1 units of AIR CONDITION', 3, CAST(2780.00 AS Numeric(18, 2)), 4)
SET IDENTITY_INSERT [dbo].[RequisitionItem] OFF
GO
SET IDENTITY_INSERT [dbo].[RequisitionStatus] ON 

INSERT [dbo].[RequisitionStatus] ([RequisitionStatusID], [RequisitionStatusDesc]) VALUES (1, N'Pending')
INSERT [dbo].[RequisitionStatus] ([RequisitionStatusID], [RequisitionStatusDesc]) VALUES (2, N'Financial Approval Given')
INSERT [dbo].[RequisitionStatus] ([RequisitionStatusID], [RequisitionStatusDesc]) VALUES (3, N'Vendor selected')
INSERT [dbo].[RequisitionStatus] ([RequisitionStatusID], [RequisitionStatusDesc]) VALUES (4, N'LPO Generated')
INSERT [dbo].[RequisitionStatus] ([RequisitionStatusID], [RequisitionStatusDesc]) VALUES (5, N'Final Approval Given')
SET IDENTITY_INSERT [dbo].[RequisitionStatus] OFF
GO
SET IDENTITY_INSERT [dbo].[RequisitionType] ON 

INSERT [dbo].[RequisitionType] ([RequisitionTypeID], [RequisitionType], [RequisitionDescription]) VALUES (1, N'Purchase', N'')
INSERT [dbo].[RequisitionType] ([RequisitionTypeID], [RequisitionType], [RequisitionDescription]) VALUES (2, N'Contract', N'')
INSERT [dbo].[RequisitionType] ([RequisitionTypeID], [RequisitionType], [RequisitionDescription]) VALUES (3, N'Service', N'')
SET IDENTITY_INSERT [dbo].[RequisitionType] OFF
GO
SET IDENTITY_INSERT [dbo].[SIUnit] ON 

INSERT [dbo].[SIUnit] ([SIUnitID], [Metric], [Measurement]) VALUES (1, N'Kg', N'Small Size (5Kg)')
INSERT [dbo].[SIUnit] ([SIUnitID], [Metric], [Measurement]) VALUES (2, N'Acre', N'Acreage')
SET IDENTITY_INSERT [dbo].[SIUnit] OFF
GO
SET IDENTITY_INSERT [dbo].[UserModule] ON 

INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (51, N'nappiah', 2, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (52, N'nappiah', 4, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (53, N'nappiah', 9, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (54, N'nappiah', 5, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (55, N'nappiah', 7, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (56, N'nappiah', 1, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (57, N'nappiah', 10, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (58, N'nappiah', 3, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (59, N'nappiah', 8, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (71, N'gantwi', 9, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (72, N'gantwi', 5, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (73, N'gantwi', 7, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (74, N'pannan', 2, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (75, N'pannan', 4, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (76, N'pannan', 9, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (77, N'pannan', 5, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (78, N'pannan', 7, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (79, N'pannan', 1, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (80, N'pannan', 10, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (81, N'pannan', 3, CAST(N'2022-04-27' AS Date))
INSERT [dbo].[UserModule] ([UserModuleID], [UserName], [ModuleID], [DateAssigned]) VALUES (82, N'pannan', 8, CAST(N'2022-04-27' AS Date))
SET IDENTITY_INSERT [dbo].[UserModule] OFF
GO
SET IDENTITY_INSERT [dbo].[Usr] ON 

INSERT [dbo].[Usr] ([Id], [surname], [firstname], [othernames], [usrname], [usrpassword], [deptId], [isActive], [isLogged], [isAD], [isAdmin], [uProfile], [tag]) VALUES (8, N'Appiah', N'Nana', N'Kofi Ofosu Gyeabour', N'nappiah', N'4DE93544234ADFFBB681ED60FFCFB941', 3, 1, 0, 0, 0, N'SysAdmin', N'')
INSERT [dbo].[Usr] ([Id], [surname], [firstname], [othernames], [usrname], [usrpassword], [deptId], [isActive], [isLogged], [isAD], [isAdmin], [uProfile], [tag]) VALUES (10, N'Antwi', N'George', N'Kwaku', N'gantwi', N'0E7517141FB53F21EE439B355B5A1D0A', 6, 1, 0, 0, 0, N'finManagerProfile', N'')
INSERT [dbo].[Usr] ([Id], [surname], [firstname], [othernames], [usrname], [usrpassword], [deptId], [isActive], [isLogged], [isAD], [isAdmin], [uProfile], [tag]) VALUES (11, N'Annan', N'Pascal', N'Tete', N'pannan', N'E64B78FC3BC91BCBC7DC232BA8EC59E0', 3, 1, 0, 0, 0, N'SysAdmin', N'IT Head')
SET IDENTITY_INSERT [dbo].[Usr] OFF
GO
SET IDENTITY_INSERT [dbo].[Vendor] ON 

INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (1, N'VND-0001', N'SELOART', N'ACCRA', N'ALFRED SELORM BETEPE', 1, NULL, NULL, NULL, N'ALFRED SELORM BETEPE', N'243661540', N'', NULL, NULL, NULL, N'selorm@seloartgroup.com', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (2, N'VND-0002', N'HAMMOND AFRICA', N'ACCRA', N'JAS HAMMOND', 1, NULL, NULL, NULL, N'JAS HAMMOND', N'244630680', N'', NULL, NULL, NULL, N'jas@hammondafrica.org', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (3, N'VND-0003', N'ISEEWORKS', N'ACCRA', N'RICHARD', 1, NULL, NULL, NULL, N'RICHARD', N'267245676', N'', NULL, NULL, NULL, N'enquiries@iseeworks.com', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (4, N'VND-0004', N'TECHDEZ DESIGN SOLUTIONS', N'ACCRA', N'KOJO KENA', 1, NULL, NULL, NULL, N'KOJO KENA', N'244647848', N'', NULL, NULL, NULL, N'kojokena@techdez.com', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (5, N'VND-0005', N'COLOUR ZONE', N'ACCRA', N'THELMA ADIYIAH-KUSI', 1, NULL, NULL, NULL, N'THELMA ADIYIAH-KUSI', N'243568033', N'', NULL, NULL, NULL, N'thelma@colourzone.com', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (6, N'VND-0006', N'BTL AFRICA', N'ACCRA', N'KOJO OWUSU ANTWI', 1, NULL, NULL, NULL, N'KOJO OWUSU ANTWI', N'244301097', N'', NULL, NULL, NULL, N'info@btlmarketinggh.com', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (7, N'VND-0007', N'THE STORY WELL', N'ACCRA', N'DANIEL ADJOKATCHER', 1, NULL, NULL, NULL, N'DANIEL ADJOKATCHER', N'242967354', N'', NULL, NULL, NULL, N'daniel@thestorywell.com.gh', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (8, N'VND-0008', N'KWIK BRAND', N'ACCRA', N'SHIRLEY ACQUAH HARRISON', 1, NULL, NULL, NULL, N'SHIRLEY ACQUAH HARRISON', N'244625838', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (9, N'VND-0009', N'PROMOTION WISE', N'ACCRA', N'KWAKU KWAKO', 1, NULL, NULL, NULL, N'KWAKU KWAKO', N'244355283', N'', NULL, NULL, NULL, N'p_wiseltd@yahoo.com', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (10, N'VND-0010', N'BRAND -A-BLAZE', N'ACCRA', N'SANDRA', 1, NULL, NULL, NULL, N'SANDRA', N'549911116', N'', NULL, NULL, NULL, N'brandablaze@gmail.com', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (11, N'VND-0011', N'PENSILINES', N'ACCRA', N'PATIENCE AIDOO', 1, NULL, NULL, NULL, N'PATIENCE AIDOO', N'202693301', N'', NULL, NULL, NULL, N'pennsilinesstudio@gmail.com', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (12, N'VND-0012', N'MAKUS  (CHAIRS & TABLE)', N'ACCRA', N'MAKUS', 1, NULL, NULL, NULL, N'MAKUS', N'272439765', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (13, N'VND-0013', N'PURPLE OYSTER', N'ACCRA', N'BRENDA BRUCE OKINE', 1, NULL, NULL, NULL, N'BRENDA BRUCE OKINE', N'202431492', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (14, N'VND-0014', N'GENET SERVICES', N'ACCRA', N'GEORGINA E. NETTEY', 1, NULL, NULL, NULL, N'GEORGINA E. NETTEY', N'244446894', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (15, N'VND-0015', N'HAMMOND AFRICA', N'ACCRA', N'JAS HAMMOND', 1, NULL, NULL, NULL, N'JAS HAMMOND', N'244630680', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (16, N'VND-0016', N'FOTOSNAP (PHOTOGRAPHY)', N'ACCRA', N'MARTIN ADDO', 1, NULL, NULL, NULL, N'MARTIN ADDO', N'208117693', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (17, N'VND-0017', N'OPEELE LTD (PHOTOGRAPHY)', N'ACCRA', N'KWAMENA ABOAGYE', 1, NULL, NULL, NULL, N'KWAMENA ABOAGYE', N'244827377', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (18, N'VND-0018', N'DESTINY SOUNDS ( MUSIC)', N'ACCRA', N'AMANKWAH', 1, NULL, NULL, NULL, N'AMANKWAH', N'265738863', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (19, N'VND-0019', N'FIELD MEDIA & PR', N'ACCRA', N'EVANS KORANTENG', 1, NULL, NULL, NULL, N'EVANS KORANTENG', N'243446833', N'', NULL, NULL, NULL, N'evans.koranteng@gmail.com', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (20, N'VND-0020', N'BIZDOOR', N'ACCRA', N'FLORA LAMPTEY', 1, NULL, NULL, NULL, N'FLORA LAMPTEY', N'244340447', N'', NULL, NULL, NULL, N'floral.lamptey@adomonline.com', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (21, N'VND-0021', N'JAVON EFFECTS LTD', N'ACCRA', N'JAVON', 1, NULL, NULL, NULL, N'JAVON', N'209992199', N'', NULL, NULL, NULL, N'javoneffectsltd@gmail.com', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (22, N'VND-0022', N'FOOTPRINTS SOLUTIONS LTD', N'ACCRA', N'', 1, NULL, NULL, NULL, N'', N'244717179', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (23, N'VND-0023', N'PARAH COMPANY LIMITED', N'ACCRA', N'', 1, NULL, NULL, NULL, N'', N'244351004', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (24, N'VND-0024', N'A.ADOMAH', N'ACCRA', N'AUNTY ADOMAH', 1, NULL, NULL, NULL, N'AUNTY ADOMAH', N'570805897', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (25, N'VND-0025', N'SOMOTEX,GHANA LIMITED', N'ACCRA', N'EMELIA', 1, NULL, NULL, NULL, N'EMELIA', N'302771907', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (26, N'VND-0026', N'3 STEPS ENGEERING LTD', N'TEST', N'ERIC ODOOM', 1, N'TEST', CAST(N'2022-04-04' AS Date), N'TEST', N'ERIC ODOOM', N'243236860', N'243236860', N'testwebsite.com', N'https://facebook.com/test', N'https://linkedin.com/test', N'testemail@somewhere.com', N'TEST', 6, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (27, N'VND-0027', N'TRADE MART', N'ACCRA', N'NADIM HAIDER', 1, NULL, NULL, NULL, N'NADIM HAIDER', N'549511115', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (28, N'VND-0028', N'REFCO ENG. LTD.', N'ACCRA', N'WILLIAM KWAKUYI', 1, NULL, NULL, NULL, N'WILLIAM KWAKUYI', N'249205577', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (29, N'VND-0029', N'DAIKIN GHANA LTD', N'ACCRA', N'', 1, NULL, NULL, NULL, N'', N'248903020', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (30, N'VND-0030', N'LYON SYSTEMS & LOGISTICS', N'ACCRA', N'STEPHEN AKAKPO', 1, NULL, NULL, NULL, N'STEPHEN AKAKPO', N'244132433', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (31, N'VND-0031', N'GENAU GHANA LIMITED', N'ACCRA', N'ALBRIGHT', 1, NULL, NULL, NULL, N'ALBRIGHT', N'241979502', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (32, N'VND-0032', N'ALSALE SERVICES LTD', N'ACCRA', N'MAAME AKUA', 1, NULL, NULL, NULL, N'MAAME AKUA', N'577679957', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (33, N'VND-0033', N'MERCHANT  PROMEDIA', N'ACCRA', N'ABEDI', 1, NULL, NULL, NULL, N'ABEDI', N'208296897', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (34, N'VND-0034', N'NKT SERVICES', N'ACCRA', N'MARTHA AGDEKUDZI', 1, NULL, NULL, NULL, N'MARTHA AGDEKUDZI', N'543694224', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (35, N'VND-0035', N'KINGDOM BOOKS & STATIONERY', N'ACCRA', N'', 1, NULL, NULL, NULL, N'', N'302764101', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (36, N'VND-0036', N'K. ASENSO ENTERPRISE', N'ACCRA', N'EUNICE', 1, NULL, NULL, NULL, N'EUNICE', N'244271710', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (37, N'VND-0037', N'WINSMARTMIN VENTURES', N'ACCRA', N'FRANCIS', 1, NULL, NULL, NULL, N'FRANCIS', N'245313044', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (38, N'VND-0038', N'THE FURNITURE OUTLET', N'ACCRA', N'OWUSU / RITA', 1, NULL, NULL, NULL, N'OWUSU / RITA', N'208981244', N'207666666', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (39, N'VND-0039', N'MAT – BANS VENTURES', N'ACCRA', N'', 1, NULL, NULL, NULL, N'', N'275912531', N'241193578', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (40, N'VND-0040', N'ANDYSARP HOME & OFFICE FURNITURE (KUMASI)', N'ACCRA', N'MR & MRS. SARPONG', 1, NULL, NULL, NULL, N'MR & MRS. SARPONG', N'208228311', N'243503785', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (41, N'VND-0041', N'KRISTOF VENTURES', N'ACCRA', N'NTIM', 1, NULL, NULL, NULL, N'NTIM', N'244778181', N'554488031', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (42, N'VND-0042', N'MIRAGE MODERN NETWORK VENTURES', N'ACCRA', N'JOSEPH QUARTEY', 1, NULL, NULL, NULL, N'JOSEPH QUARTEY', N'243329850', N'277197973', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (43, N'VND-0043', N'I.P.M.C.', N'ACCRA', N'SALOMEY / ABDUL', 1, NULL, NULL, NULL, N'SALOMEY / ABDUL', N'208542517', N'245356426', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (44, N'VND-0044', N'INLAKS', N'ACCRA', N'', 1, NULL, NULL, NULL, N'', N'302773273', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (45, N'VND-0045', N'ENTERPRISE TECHNOLOGIES LTD', N'ACCRA', N'RICH', 1, NULL, NULL, NULL, N'RICH', N'0', N'', NULL, NULL, NULL, N'enterprisetechgh@outlook.com', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (46, N'VND-0046', N'CAN-WEST  LTD', N'ACCRA', N'', 1, NULL, NULL, NULL, N'', N'302782858', N'245313030', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (47, N'VND-0047', N'OMAN FOFRO TRADING CO. LTD', N'ACCRA', N'FREDA', 1, NULL, NULL, NULL, N'FREDA', N'200747874', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (48, N'VND-0048', N'ENTERPRISE COMPUTING LTD', N'ACCRA', N'CIONILDA ESI CUDJOE', 1, NULL, NULL, NULL, N'CIONILDA ESI CUDJOE', N'0', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (49, N'VND-0049', N'OSTEC LTD', N'ACCRA', N'DENNIS ADUSAH', 1, NULL, NULL, NULL, N'DENNIS ADUSAH', N'501673962', N'302240121', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (50, N'VND-0050', N'DITA  DANG MICROSYSTEMS', N'ACCRA', N'TABITHA', 1, NULL, NULL, NULL, N'TABITHA', N'246444644', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (51, N'VND-0051', N'COMPUTER WAREHOUSE (CWG GHANA LIMITED)', N'ACCRA', N'HARRIET / PEDITHA', 1, NULL, NULL, NULL, N'HARRIET / PEDITHA', N'202200030', N'243111927', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (52, N'VND-0052', N'TELESOL', N'ACCRA', N'', 1, NULL, NULL, NULL, N'', N'', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (53, N'VND-0053', N'GOTECH INFO  SYSTEMS', N'ACCRA', N'JOHN KWESI GODIGBE', 1, NULL, NULL, NULL, N'JOHN KWESI GODIGBE', N'244562136', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (54, N'VND-0054', N'TRADE MART', N'ACCRA', N'NADIM HAIDER', 1, NULL, NULL, NULL, N'NADIM HAIDER', N'549511115', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (55, N'VND-0055', N'VIRTUAL SECURITY AFRICA LTD', N'ACCRA', N'EMMANUEL ASIEDU', 1, NULL, NULL, NULL, N'EMMANUEL ASIEDU', N'542688930', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (56, N'VND-0056', N'ENTERPRISE IT SOLUTION', N'ACCRA', N'', 1, NULL, NULL, NULL, N'', N'0', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (57, N'VND-0057', N'ENTERPRISE COMPUTING LTD', N'ACCRA', N'CIONILDA ESI CUDJOE', 1, NULL, NULL, NULL, N'CIONILDA ESI CUDJOE', N'244831561', N'202057007', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (58, N'VND-0058', N'HUB COMPUTERS', N'ACCRA', N'', 1, NULL, NULL, NULL, N'', N'243522383', N'262522383', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (59, N'VND-0059', N'OMAN FOFOR TRADING CO.LTD.', N'ACCRA', N'FREDA ARYEETEY', 1, NULL, NULL, NULL, N'FREDA ARYEETEY', N'200747874', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (60, N'VND-0060', N'GOTECH INFO  SYSTEMS', N'ACCRA', N'JOHN KWESI GODIGBE', 1, NULL, NULL, NULL, N'JOHN KWESI GODIGBE', N'244562136', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (61, N'VND-0061', N'TRADE MART', N'ACCRA', N'NADIM HAIDER', 1, NULL, NULL, NULL, N'NADIM HAIDER', N'549511115', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (62, N'VND-0062', N'MODERN AGE TECHNOLOGIES GH. LTD.', N'ACCRA', N'', 1, NULL, NULL, NULL, N'', N'302778841', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (63, N'VND-0063', N'PRIMETECH FOCUS LIMITED', N'ACCRA', N'DELPHINE TEYE', 1, NULL, NULL, NULL, N'DELPHINE TEYE', N'243683958', N'263631818', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (64, N'VND-0064', N'TRANGO I.T. SOLUTION (LAPTOP REPAIRS & PART REPLACEMENT)', N'ACCRA', N'HAPPY', 1, NULL, NULL, NULL, N'HAPPY', N'249477629', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (65, N'VND-0065', N'CENTASTAGE LIMITED', N'ACCRA', N'MICHAEL', 1, NULL, NULL, NULL, N'MICHAEL', N'244645661', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (66, N'VND-0066', N'HAM VENTURES', N'ACCRA', N'ABDUL', 1, NULL, NULL, NULL, N'ABDUL', N'244698220', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (67, N'VND-0067', N'SPLINTER CELL LIMITED', N'ACCRA', N'NANA', 1, NULL, NULL, NULL, N'NANA', N'576155441', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (68, N'VND-0068', N'KREATIVE PRINTS SERVICES', N'ACCRA', N'GLORIA NYABI', 1, NULL, NULL, NULL, N'GLORIA NYABI', N'244104723', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (69, N'VND-0069', N'JEMYKE VENTURES', N'ACCRA', N'MICHAEL ANKRAH', 1, NULL, NULL, NULL, N'MICHAEL ANKRAH', N'242678643', N'277545347', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (70, N'VND-0070', N'DIVINE LINKAGE CO. LTD (BATCH HEADERS)', N'ACCRA', N'GHAPSON', 1, NULL, NULL, NULL, N'GHAPSON', N'206832725', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (71, N'VND-0071', N'ROCK IMAGE ( RAPID TRANSFER FORMS)', N'ACCRA', N'GEORGE OFOSU', 1, NULL, NULL, NULL, N'GEORGE OFOSU', N'274605436', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (72, N'VND-0072', N'CAMELOT GH. LTD.', N'ACCRA', N'MERILYN', 1, NULL, NULL, NULL, N'MERILYN', N'205031068', N'', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
INSERT [dbo].[Vendor] ([VendorID], [VendorNo], [VendorName], [VendorLocation], [ContactPerson], [VendorTypeID], [CompanyRegistrationNo], [IncorporationDate], [TIN], [NameOfOwner], [CompanyContact], [CompanyHomeContact], [CompanyWebsite], [CompanyFb], [CompanyLinkedIn], [CompanyEmailAddress], [CompanyGHPostAddress], [CompanyBusinessTypeID], [CreatedBy], [CreatedDate], [LastUpdatedBy], [LastUpdatedDate]) VALUES (73, N'VND-0073', N'MAT(MODERN AGE TECHNOLOGIES LTD.)', N'ACCRA', N'', 1, NULL, NULL, NULL, N'', N'', N'302764867', NULL, NULL, NULL, N'', NULL, NULL, N'nappiah', CAST(N'2022-04-12' AS Date), NULL, NULL)
SET IDENTITY_INSERT [dbo].[Vendor] OFF
GO
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
GO
ALTER TABLE [dbo].[Branch] ADD  CONSTRAINT [DF_Branch_Code]  DEFAULT ('') FOR [Code]
GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_Head]  DEFAULT ((0)) FOR [Head]
GO
ALTER TABLE [dbo].[CommitteeMember]  WITH CHECK ADD  CONSTRAINT [FK_CommitteeMember_Committee] FOREIGN KEY([CommitteeID])
REFERENCES [dbo].[Committee] ([CommitteeID])
GO
ALTER TABLE [dbo].[CommitteeMember] CHECK CONSTRAINT [FK_CommitteeMember_Committee]
GO
ALTER TABLE [dbo].[CommitteeMember]  WITH CHECK ADD  CONSTRAINT [FK_CommitteeMember_Position] FOREIGN KEY([PositionID])
REFERENCES [dbo].[Position] ([PositionID])
GO
ALTER TABLE [dbo].[CommitteeMember] CHECK CONSTRAINT [FK_CommitteeMember_Position]
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
ALTER TABLE [dbo].[PFNotificationList]  WITH CHECK ADD  CONSTRAINT [FK_PFNotificationList_NotificationGroup] FOREIGN KEY([NotificationGroupID])
REFERENCES [dbo].[NotificationGroup] ([NotificationGroupID])
GO
ALTER TABLE [dbo].[PFNotificationList] CHECK CONSTRAINT [FK_PFNotificationList_NotificationGroup]
GO
ALTER TABLE [dbo].[PFNotificationList]  WITH CHECK ADD  CONSTRAINT [FK_PFNotificationList_ProcessFlow] FOREIGN KEY([PFID])
REFERENCES [dbo].[ProcessFlow] ([ProcessFlowID])
GO
ALTER TABLE [dbo].[PFNotificationList] CHECK CONSTRAINT [FK_PFNotificationList_ProcessFlow]
GO
ALTER TABLE [dbo].[ProcessFlow]  WITH CHECK ADD  CONSTRAINT [FK_ProcessFlow_ProcurementType] FOREIGN KEY([ProcurementTypeId])
REFERENCES [dbo].[ProcurementType] ([ProcurementTypeID])
GO
ALTER TABLE [dbo].[ProcessFlow] CHECK CONSTRAINT [FK_ProcessFlow_ProcurementType]
GO
ALTER TABLE [dbo].[Requisition]  WITH CHECK ADD  CONSTRAINT [FK_Requisition_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[Company] ([CompanyID])
GO
ALTER TABLE [dbo].[Requisition] CHECK CONSTRAINT [FK_Requisition_Company]
GO
ALTER TABLE [dbo].[Requisition]  WITH CHECK ADD  CONSTRAINT [FK_Requisition_Currency] FOREIGN KEY([CurrencyID])
REFERENCES [dbo].[Currency] ([CurrencyID])
GO
ALTER TABLE [dbo].[Requisition] CHECK CONSTRAINT [FK_Requisition_Currency]
GO
ALTER TABLE [dbo].[Requisition]  WITH CHECK ADD  CONSTRAINT [FK_Requisition_Department] FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Department] ([DepartmentID])
GO
ALTER TABLE [dbo].[Requisition] CHECK CONSTRAINT [FK_Requisition_Department]
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
ALTER TABLE [dbo].[RequisitionItem]  WITH CHECK ADD  CONSTRAINT [FK_RequisitionItem_LPO] FOREIGN KEY([LPOID])
REFERENCES [dbo].[LPO] ([LPOID])
GO
ALTER TABLE [dbo].[RequisitionItem] CHECK CONSTRAINT [FK_RequisitionItem_LPO]
GO
ALTER TABLE [dbo].[UserModule]  WITH CHECK ADD  CONSTRAINT [FK_UserModule_Module] FOREIGN KEY([ModuleID])
REFERENCES [dbo].[Module] ([ModuleID])
GO
ALTER TABLE [dbo].[UserModule] CHECK CONSTRAINT [FK_UserModule_Module]
GO
ALTER TABLE [dbo].[Usr]  WITH CHECK ADD  CONSTRAINT [FK_Usr_Department] FOREIGN KEY([deptId])
REFERENCES [dbo].[Department] ([DepartmentID])
GO
ALTER TABLE [dbo].[Usr] CHECK CONSTRAINT [FK_Usr_Department]
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
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'foreign key to dbo.CapexType table (Land and Buildings, Office Equipment, etc)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Capex', @level2type=N'COLUMN',@level2name=N'CapexTypeID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the deadline for the procurement of the asset (eg: January, 2022)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Capex', @level2type=N'COLUMN',@level2name=N'EstimatedDeadline'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the quantity requested by branch' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Capex', @level2type=N'COLUMN',@level2name=N'QuantityRequested'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the Quantity supplied currently' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Capex', @level2type=N'COLUMN',@level2name=N'QuantitySupplied'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'outstanding quantity yet to be supplied' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Capex', @level2type=N'COLUMN',@level2name=N'QuantityOutstanding'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'justification for the procurement request' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Capex', @level2type=N'COLUMN',@level2name=N'Justification'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'foreign key to the financial year in question' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Capex', @level2type=N'COLUMN',@level2name=N'FinancialYrId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Company', @level2type=N'COLUMN',@level2name=N'CompanyID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'description or name of the company (i.e. PAN AFRICAN SAVINGS AND LOANS)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Company', @level2type=N'COLUMN',@level2name=N'CompanyDescription'
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
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the status id of the LPO' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LPO', @level2type=N'COLUMN',@level2name=N'LPOStatusID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'total amount' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LPO', @level2type=N'COLUMN',@level2name=N'TotAmt'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'LPO reference' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LPO', @level2type=N'COLUMN',@level2name=N'LPONo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'type of procurement' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LPO', @level2type=N'COLUMN',@level2name=N'ProcurementTypeId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'approval ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LPOApproval', @level2type=N'COLUMN',@level2name=N'ApprovalID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the ID of the LPO' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LPOApproval', @level2type=N'COLUMN',@level2name=N'LPO_ID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the tag of the person making the approval' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LPOApproval', @level2type=N'COLUMN',@level2name=N'PersonTag'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the date of the approval' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LPOApproval', @level2type=N'COLUMN',@level2name=N'ApprovalDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the status of the approval' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LPOApproval', @level2type=N'COLUMN',@level2name=N'ApprovalStatus'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'comments of the approval' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LPOApproval', @level2type=N'COLUMN',@level2name=N'ApprovalComments'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Module', @level2type=N'COLUMN',@level2name=N'ModuleID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'system name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Module', @level2type=N'COLUMN',@level2name=N'SystemName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'public name of the module' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Module', @level2type=N'COLUMN',@level2name=N'PublicName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the date it was assigned to user' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Module', @level2type=N'COLUMN',@level2name=N'DateAssigned'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'NotificationList', @level2type=N'COLUMN',@level2name=N'NotificationID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'first name of the notifier' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'NotificationList', @level2type=N'COLUMN',@level2name=N'FirstName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'last name of the notifier' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'NotificationList', @level2type=N'COLUMN',@level2name=N'LastName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'email address of notifier' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'NotificationList', @level2type=N'COLUMN',@level2name=N'EmailAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'tags are keywords of products for which notifier is alerted' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'NotificationList', @level2type=N'COLUMN',@level2name=N'tag'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'determines if the notifier is active or not' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'NotificationList', @level2type=N'COLUMN',@level2name=N'isActive'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Position', @level2type=N'COLUMN',@level2name=N'PositionID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'title or designation ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Position', @level2type=N'COLUMN',@level2name=N'Designation'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key for the Priority lookup' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PriorityType', @level2type=N'COLUMN',@level2name=N'PriorityID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'priority description' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PriorityType', @level2type=N'COLUMN',@level2name=N'PriorityDescription'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'a text description of the process flow for a procurement' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProcessFlowList', @level2type=N'COLUMN',@level2name=N'Flow'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProcurementType', @level2type=N'COLUMN',@level2name=N'ProcurementTypeID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the description of the procurement' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProcurementType', @level2type=N'COLUMN',@level2name=N'ProcurementDescription'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Profile', @level2type=N'COLUMN',@level2name=N'Id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'name of profile' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Profile', @level2type=N'COLUMN',@level2name=N'profileName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'content of profile' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Profile', @level2type=N'COLUMN',@level2name=N'profileContent'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'determines if profile is in use' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Profile', @level2type=N'COLUMN',@level2name=N'inUse'
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
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionFile', @level2type=N'COLUMN',@level2name=N'RequisitionFileID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'requisition id' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionFile', @level2type=N'COLUMN',@level2name=N'RequisitionID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'requisition file name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionFile', @level2type=N'COLUMN',@level2name=N'RequisitionFileDescription'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'bytes for the requisition file' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionFile', @level2type=N'COLUMN',@level2name=N'RequisitionFileName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key for the table entity' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionItem', @level2type=N'COLUMN',@level2name=N'RequisitionItemID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the ID of the requisition' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionItem', @level2type=N'COLUMN',@level2name=N'RequisitionID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the ID of the item' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionItem', @level2type=N'COLUMN',@level2name=N'ItemID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the quantity being requisitioned' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionItem', @level2type=N'COLUMN',@level2name=N'Quantity'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Quantity x Rate gives ITEM AMOUNT' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionItem', @level2type=N'COLUMN',@level2name=N'Narration'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1=financial approval given, 0=requisition declined' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'RequisitionItem', @level2type=N'COLUMN',@level2name=N'FinApprovalStatus'
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
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'primary key of the table entity' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Usr', @level2type=N'COLUMN',@level2name=N'Id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'username of the system user' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Usr', @level2type=N'COLUMN',@level2name=N'usrname'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'the password of the user' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Usr', @level2type=N'COLUMN',@level2name=N'usrpassword'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'determines if the user is active in the system' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Usr', @level2type=N'COLUMN',@level2name=N'isActive'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'determines if the user has logged in' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Usr', @level2type=N'COLUMN',@level2name=N'isLogged'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'determines if the user is using the active directory or normal log in procedures' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Usr', @level2type=N'COLUMN',@level2name=N'isAD'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'flag determining if user has administrative privileges' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Usr', @level2type=N'COLUMN',@level2name=N'isAdmin'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'a non-mandatory classification of user, usually position or grade related for approval purposes. for ge: Managing Director, Head, hrm' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Usr', @level2type=N'COLUMN',@level2name=N'tag'
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
ALTER DATABASE [eProcurementDb] SET  READ_WRITE 
GO
