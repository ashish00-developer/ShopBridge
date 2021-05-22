using ProductSVC.Models.Interfaces;
using ShopBridge.Models;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace ProductSVC
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<ICatalogRepository, CatalogRepository>();
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}