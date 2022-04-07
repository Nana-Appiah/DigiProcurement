using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DigiProc;

using System.Diagnostics;


namespace DigiProc.Helpers
{
    public class Utility
    {
        #region Properties

        private ProcurementDbEntities config = new ProcurementDbEntities();

        public VendorType oVendorType { get; set; }
        public ItemCategory itemCategory { get; set; }
        public Item item { get; set; }

        #endregion

        public Utility()
        {

        }

        #region User-Modules
        public List<userModule> getUserModules(string nameOfuser)
        {
            /* method uses the argument to load the user modules to expose on the system */
            var exposed_modules = config.UserModules.Where(x => x.UserName == nameOfuser).ToList();
            List<userModule> list = new List<userModule>();

            foreach(var item in exposed_modules)
            {
                list.Add(new userModule { Id = item.UserModuleID, SystemName = item.Module.SystemName });
            }

            return list;
        }

        #endregion

        #region Item-Category
        public List<ItemCategorization> getItemCategories()
        {
            var item_categories = new List<ItemCategory>();
            var category_list = new List<ItemCategorization>();

            try
            {
                item_categories = config.ItemCategories.ToList();
                if (item_categories.Count() > 0)
                {
                    foreach(var item in item_categories)
                    {
                        ItemCategorization obj = new ItemCategorization() { 
                            Id = item.CategoryID,
                            nameOfCategory = item.CategoryName,
                            descriptionOfCategory = item.CategoryDescription
                        };

                        category_list.Add(obj);
                    }
                }

                return category_list;
            }
            catch(Exception ex)
            {
                Debug.Print($"error: {ex.Message}");
                return category_list;
            }
        }

        public bool SaveItemCategory()
        {
            try
            {
                config.ItemCategories.Add(itemCategory);
                config.SaveChanges();

                return true;
            }
            catch(Exception x)
            {
                throw x;
            }
        }

        public bool UpdateItemCategory()
        {
            try
            {
                var o = config.ItemCategories.Where(c => c.CategoryID == itemCategory.CategoryID).FirstOrDefault();
                o.CategoryName = itemCategory.CategoryName;
                o.CategoryDescription = itemCategory.CategoryDescription;

                config.SaveChanges();
                return true;
            }
            catch(Exception x)
            {
                throw x;
            }
        }

        #endregion

        public List<StandardUnit> getItemMetrics()
        {
            var item_metrics = new List<SIUnit>();
            var formatted_metrics = new List<StandardUnit>();

            try
            {
                item_metrics = config.SIUnits.ToList();
                if (item_metrics.Count() > 0)
                {
                    foreach(var item in item_metrics)
                    {
                        StandardUnit obj = new StandardUnit() { 
                            Id = item.SIUnitID,
                            Metric = item.Metric,
                            Measurement = item.Measurement
                        };

                        formatted_metrics.Add(obj);
                    }
                }

                return formatted_metrics;
            }
            catch(Exception ex)
            {
                return formatted_metrics;
            }
        }

        public List<BusinessType> getBusinessTypes()
        {
            var business_types = new List<BusinessType>();
            try
            {
                var data = config.BusinessTypes.ToList();
                if (data.Count() > 0)
                {
                    foreach(var d in data)
                    {
                        var b = new BusinessType() { 
                             BusinessTypeID = d.BusinessTypeID,
                             BusinessDescription = d.BusinessDescription
                        };

                        business_types.Add(b);
                    }
                }

                return business_types;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return business_types;
            }
        }

        #region Accounting Periods

        public List<FinancialYear> getFinancialYearsAsync()
        {
            //gets financial years
            var account_periods = new List<FinancialYear>();
            try
            {
                account_periods = config.FinancialYears.Where(x => x.IsActive == 1).ToList();
                return account_periods;
            }
            catch (Exception x)
            {
                Debug.Print(x.Message);
                return account_periods;
            }
        }

        public bool saveFinancialYear(int periodFrm, int periodTo, string brief)
        {
            try
            {
                var obj = new FinancialYear() { FinancialYr = $"{periodFrm}-{periodTo}", Description = brief };
                config.FinancialYears.Add(obj);
                config.SaveChanges();
                return true;
            }
            catch(Exception x)
            {
                Debug.Print($"error: {x.Message}");
                return false;
            }
        }

        #endregion

        #region Currency

        public bool saveCurrency(string cName, string cSymbol)
        {
            try
            {
                var currencyObj = new Currency() { CurrencyName = cName, CurrencySymbol = cSymbol };
                config.Currencies.Add(currencyObj);
                config.SaveChanges();

                return true;
            }
            catch(Exception x)
            {
                Debug.Print($"error: {x.Message}");
                return false;
            }
        }

        public bool updateCurrency(int id, string cName, string cSymbol)
        {
            try
            {
                var obj = config.Currencies.Where(c => c.CurrencyID == id).FirstOrDefault();

                obj.CurrencyName = cName;
                obj.CurrencySymbol = cSymbol;
                config.SaveChanges();

                return true;
            }
            catch(Exception x)
            {
                Debug.Print($"error: {x.Message}");
                return false;
            }
        }

        public List<Denomination> getCurrencies()
        {
            List<Currency> currency_list = new List<Currency>();
            List<Denomination> denomList = new List<Denomination>();

            try
            {
                currency_list = config.Currencies.ToList();
                if (currency_list.Count() > 0)
                {
                    foreach(var item in currency_list)
                    {
                        var obj = new Denomination() { 
                            Id = item.CurrencyID,
                            nameOfcurrency = item.CurrencyName,
                            denominationSymbol = item.CurrencySymbol
                        };

                        denomList.Add(obj);
                    }
                }

                return denomList.ToList();
            }
            catch(Exception x)
            {
                return denomList;
            }
        }

        #endregion

        #region Vendor-Type

        public bool saveVendorType()
        {
            try
            {
                config.VendorTypes.Add(oVendorType);
                config.SaveChanges();

                return true;
            }
            catch(Exception x)
            {
                Debug.Print(x.Message);
                return false;
            }
        }

        public bool updateVendorType()
        {
            try
            {
                var obj = config.VendorTypes.Where(x => x.VendorTypeID == oVendorType.VendorTypeID).FirstOrDefault();
                obj.VendorDescription = oVendorType.VendorDescription;
                config.SaveChanges();

                return true;
            }
            catch(Exception x)
            {
                Debug.Print(x.Message);
                return false;
            }
        }

        public List<VendorTypeLookup> getVendorTypes()
        {
            List<VendorType> vendorTypes = new List<VendorType>();
            List<VendorTypeLookup> vendor_types = new List<VendorTypeLookup>();

            try
            {
                vendorTypes =  config.VendorTypes.ToList();
                if (vendorTypes.Count() > 0)
                {
                    foreach(var item in vendorTypes)
                    {
                        var o = new VendorTypeLookup()
                        {
                            Id = item.VendorTypeID,
                            Description = item.VendorDescription
                        };

                        vendor_types.Add(o);
                    }
                }

                return vendor_types;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region Item

        public bool SaveItem(string measuredIn)
        {
            //saves item to the data store
            try
            {
                int unitId = new StandardUnit() { }.get(config, measuredIn).Id;
                var obj = new SIUnit { SIUnitID = unitId };
                item.SIUnitID = obj.SIUnitID;
                config.Items.Add(item); 
                config.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateItem()
        {
            try
            {
                var o = config.Items.Where(i => i.ItemID == item.ItemID).FirstOrDefault();

                o.ItemName = item.ItemName;
                o.ItemCode = item.ItemCode;
                o.ItemCategoryID = item.ItemCategoryID;
                o.MinStockLevel = item.MinStockLevel;
                o.MaxStockLevel = item.MaxStockLevel;
                o.ItemDescription = item.ItemDescription;

                config.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public List<Product> GetItems()
        {
            //gets all the items in the data store
            var item_list = new List<Item>();
            var product_list = new List<Product>();

            try
            {
                item_list = config.Items.ToList();
                if (item_list.Count() > 0)
                {
                    foreach(var item in item_list)
                    {
                        var obj = new Product() { 
                            Id = item.ItemID,
                            ProductName = item.ItemName,
                            ProductCode = item.ItemCode,
                            ProductMinimumStock = (int)item.MinStockLevel,
                            ProductMaximumStock = (int)item.MaxStockLevel,
                            ProductDescription = item.ItemDescription,
                            SIUnit = new StandardUnit { }.get(config, (int)item.SIUnitID)
                        };

                        product_list.Add(obj);
                    }
                }

                return product_list;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public string generateItemCode(string itemcategory, int itemcategoryID)
        {
            //method is responsible for the generation of item code
            try
            {
                var prefix = generatePrefix(itemcategory);
                var nextID = getNextCounterID(itemcategoryID);
                var formattedID = formatNextID(nextID.ToString());

                return String.Format("{0}-{1}", prefix, formattedID);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        private string generatePrefix(string strItem_category)
        {
            var str = strItem_category.Substring(0, 2);
            return string.Format("{0}", str.ToUpper());
        }

        private int getNextCounterID(int id)
        {
            //gets the highest number..add one to it and return
            try
            {
                int currentMax = config.Items.Where(m => m.ItemCategoryID == id).Max(x => x.ItemID);
                return currentMax += 1;
            }
            catch(Exception x)
            {
                return 1;
            }
            
        }

        private string formatNextID(string nextID)
        {
            int LEN = nextID.Length;
            if (LEN == 1)
            {
                nextID = string.Format("{0}{1}", @"000", nextID);
            }
            else if(LEN == 2)
            {
                nextID = string.Format("{0}{1}", @"00", nextID);
            }
            else if(LEN == 3)
            {
                nextID = string.Format("{0}{1}", @"0", nextID);
            }

            return nextID;
        }

        #endregion

        #region Priority

        public List<Priority> GetPriorityTypes()
        {
            List<PriorityType> priorityTypes = new List<PriorityType>();
            List<Priority> data = new List<Priority>();

            try
            {
                priorityTypes = config.PriorityTypes.ToList();
                if (priorityTypes.Count() > 0)
                {
                    foreach(var item in priorityTypes)
                    {
                        var p = new Priority() { Id = item.PriorityID, nameOfPriority = item.PriorityDescription };
                        data.Add(p);
                    }
                }

                return data.ToList();
            }
            catch(Exception x)
            {
                Debug.Print(x.Message);
                throw x;
            }
        }

        #endregion

        #region Requisition-Types

        public List<RequisitionType> GetRequisitionTypes()
        {
            List<RequisitionType> requisition_types = new List<RequisitionType>();
            try
            {
                var _data = config.RequisitionTypes.ToList();
                if (_data.Count() > 0)
                {
                    foreach(var d in _data)
                    {
                        var rq = new RequisitionType() 
                        { 
                            RequisitionTypeID = d.RequisitionTypeID,
                            RequisitionType1 = d.RequisitionType1,
                            RequisitionDescription = d.RequisitionDescription
                        };

                        requisition_types.Add(rq);
                    }
                }

                return requisition_types;
            }
            catch(Exception x)
            {
                Debug.Print(x.Message);
                return requisition_types;
            }
        }

        #endregion

        #region Company

        public Company getDefaultCompany()
        {
            Company obj = null;

            try
            {
                var o = config.Companies.Where(c => c.CompanyID == 1).FirstOrDefault();
                if (o.CompanyID > 0)
                {
                    obj = new Company() { 
                        CompanyID = o.CompanyID,
                        CompanyDescription = o.CompanyDescription
                    };
                }

                return obj;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return obj;
            }
        }

        #endregion

    }

    #region Structs
    public struct userModule
    {
        public int Id { get; set; }
        public string SystemName { get; set; }
    }

    public struct StandardUnit
    {
        public int Id { get; set; }
        public string Metric { get; set; }
        public string Measurement { get; set; }

        public StandardUnit get(ProcurementDbEntities config, int _Id)
        {
            //gets the standard unit using id
            StandardUnit su = new StandardUnit();
            try
            {
                var o = config.SIUnits.Where(x => x.SIUnitID == _Id).FirstOrDefault();
                if (o != null)
                {
                    su.Id = o.SIUnitID;
                    su.Metric = o.Metric;
                    su.Measurement = o.Measurement;
                }

                return su;
            }
            catch(Exception x)
            {
                throw x;
            }
        }

        public StandardUnit get(ProcurementDbEntities config, string strMeasuredIn)
        {
            //gets the standard unit using id
            StandardUnit su = new StandardUnit();
            try
            {
                var o = config.SIUnits.Where(x => x.Measurement == strMeasuredIn).FirstOrDefault();
                if (o != null)
                {
                    su.Id = o.SIUnitID;
                    su.Metric = o.Metric;
                    su.Measurement = o.Measurement;
                }

                return su;
            }
            catch (Exception x)
            {
                throw x;
            }
        }

    }
    
    public struct ItemCategorization
    {
        public int Id { get; set; }
        public string nameOfCategory { get; set; }
        public string descriptionOfCategory { get; set; }
    }

    public struct Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public int ProductMinimumStock { get; set; }
        public int ProductMaximumStock { get; set; }
        public string ProductDescription { get; set; }
        public StandardUnit SIUnit { get; set; }
    }

    public struct VendorTypeLookup
    {
        public int Id { get; set; }
        public string Description { get; set; }
    }

    public struct Denomination
    {
        public int Id { get; set; }
        public string nameOfcurrency { get; set; }
        public string denominationSymbol { get; set; }
    }

    public struct Priority
    {
        public int Id { get; set; }
        public string nameOfPriority { get; set; }
    }

    public struct UserSession
    {
        public string userName { get; set; }
        public Department userDepartment { get; set; }

    }

    #endregion

}