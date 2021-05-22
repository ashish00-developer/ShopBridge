using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShopBridge.Controllers
{
    public class ProductController : Controller
    {
        // GET: ProductList
        public ActionResult ProductList()
        {
            return View();
        }
        public ActionResult ProductDetail()
        {
            return View();
        }
    }
}