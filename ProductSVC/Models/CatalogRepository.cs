using ProductSVC.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ShopBridge.Models
{
    public class CatalogRepository : ICatalogRepository
    {
        CatalogContext catalogContext = new CatalogContext();
        public bool IsProductExist(int itemID)
        {
            return catalogContext.catalogItems.Where(x => x.ItemID == itemID).Any();
        }

        public bool AddProduct(CatalogItems catalog)
        {
            try
            {
                catalogContext.catalogItems.Add(new CatalogItems()
                {
                    Quantity = catalog.Quantity,
                    Color = catalog.Color,
                    Name = catalog.Name,
                    Price = catalog.Price,
                    Description = catalog.Description,
                    CreatedOn = DateTime.Now,
                    ModifiedOn = DateTime.Now
                });
                catalogContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool UpdateProduct(CatalogItems catalog)
        {
            try
            {
                var item = catalogContext.catalogItems.FirstOrDefault(x => x.ItemID == catalog.ItemID);
                if (item != null)
                {
                    item.Quantity = catalog.Quantity;
                    item.Color = catalog.Color;
                    item.Name = catalog.Name;
                    item.Price = catalog.Price;
                    item.Description = catalog.Description;
                    item.ModifiedOn = DateTime.Now;
                    catalogContext.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool DeleteProduct(int ItemID)
        {
            try
            {
                var item = catalogContext.catalogItems.FirstOrDefault(x => x.ItemID == ItemID);
                catalogContext.catalogItems.Remove(item);
                catalogContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public CatalogItems GetProductDetail(int id)
        {
            try
            {
                CatalogItems catalogItem = new CatalogItems();
                var item = catalogContext.catalogItems.FirstOrDefault(x => x.ItemID == id);
                if (item != null)
                {
                    catalogItem.ItemID = item.ItemID;
                    catalogItem.Color = item.Color;
                    catalogItem.Quantity = catalogItem.Quantity;
                    catalogItem.Name = item.Name;
                    catalogItem.Price = item.Price;
                    catalogItem.Description = item.Description;
                    catalogItem.ModifiedOn = item.ModifiedOn;
                }
                return catalogItem;
            }
            catch (Exception ex)
            {
                return new CatalogItems();
            }
        }

        public List<CatalogItems> GetProductList()
        {
            List<CatalogItems> catalogItems = new List<CatalogItems>();
            try
            {
                var items = catalogContext.catalogItems.OrderBy(x => x.ItemID).ToList();
                foreach (var item in items)
                {
                    //Adding product list
                    catalogItems.Add(new CatalogItems()
                    {
                        ItemID = item.ItemID,
                        Color = item.Color,
                        Quantity = item.Quantity,
                        Name = item.Name,
                        Price = item.Price,
                        Description = item.Description,
                        ModifiedOn = item.ModifiedOn
                    });
                }
                return catalogItems;
            }
            catch (Exception ex)
            {
                return new List<CatalogItems>();
            }
        }
    }
}