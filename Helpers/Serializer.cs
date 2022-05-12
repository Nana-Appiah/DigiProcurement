using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Runtime.Serialization.Json;
using System.IO;

namespace DigiProc.Helpers
{
    
    public class Serializer 
    {
        public static string SerializeObjectToJson(UserSession o)
        {
            MemoryStream ms = new MemoryStream();
            DataContractJsonSerializer js = new DataContractJsonSerializer(typeof(UserSession));
            js.WriteObject(ms, o);
            ms.Position = 0;
            StreamReader sr = new StreamReader(ms);
            var str =  sr.ReadToEnd();
            return str;
        }

        public static string SerializeObject(UserSession o)
        {
            MemoryStream ms = new MemoryStream();
            BinaryFormatter b = new BinaryFormatter();
            b.Serialize(ms, o);
            return ms.GetBuffer().ToString();
        }
    }
}