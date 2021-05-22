using ShopBridge.Models;
using System.Collections.Generic;

namespace ProductSVC.Models.Interfaces
{
    public interface ICatalogRepository
    {
        bool IsProductExist(int itemID);
        bool AddProduct(CatalogItems catalog);
        bool UpdateProduct(CatalogItems catalog);
        bool DeleteProduct(int ItemID);
        CatalogItems GetProductDetail(int id);
        List<CatalogItems> GetProductList();
    }
}