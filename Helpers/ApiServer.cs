using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;

using System.Configuration;
using System.Diagnostics;
using System.Threading.Tasks;

namespace DigiProc.Helpers
{
    public class ApiServer
    {
        string baseURI = ConfigurationManager.AppSettings["api"].ToString();
        public string ApiParams { get; set; }

        public string ApiRequest()
        {
            string final = string.Empty;

            try
            {
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseURI);

                //adding an accept header for json format
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //serialize here
                
                //list data response
                HttpContent c = new StringContent(ApiParams, System.Text.Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync(baseURI, c).Result;
                if (response.IsSuccessStatusCode)
                {
                    using (HttpContent content = response.Content)
                    {
                        final = response.StatusCode.ToString();
                    }
                }

                return final;
            }
            catch(Exception ex)
            {
                Debug.Print(ex.Message);
                return String.Empty;
            }
        }

    }
}