using ProductSVC.Models.Interfaces;
using ShopBridge.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ShopBridge.Controllers
{
    public class CatalogController : ApiController
    {
        private ICatalogRepository _catalogRepository;

        public CatalogController(ICatalogRepository catalogRepository)
        {
            _catalogRepository = catalogRepository;
        }

        // GET: CatalogItem List
        [HttpGet]
        [Route("api/productlist")]
        public List<CatalogItems> ProductList()
        {
            return _catalogRepository.GetProductList();
        }

        // GET: CatalogItem details
        [HttpGet]
        [Route("api/productdetail")]
        public CatalogItems ProductDetail(int ItemID)
        {
            return _catalogRepository.GetProductDetail(ItemID);
        }

        //POST: Addition or updation of product
        [HttpPost]
        [Route("api/addupdateproduct")]
        public bool AddUpdateProduct(CatalogItems catalogItem)
        {
            return _catalogRepository.IsProductExist(catalogItem.ItemID) ? _catalogRepository.UpdateProduct(catalogItem)
                : _catalogRepository.AddProduct(catalogItem);
        }

        //POST: Deletion of product
        [HttpPost]
        [Route("api/deleteproduct")]
        public bool DeleteProduct(int ItemID)
        {
            return _catalogRepository.DeleteProduct(ItemID);
        }

    }
}