USE [HRMS]
GO
/****** Object:  Table [dbo].[Branch]    Script Date: 4/27/2022 5:34:47 PM ******/
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
ALTER TABLE [dbo].[Branch] ADD  CONSTRAINT [DF_Branch_Code]  DEFAULT ('') FOR [Code]
GO
