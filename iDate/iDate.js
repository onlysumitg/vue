 
function iDate(date, dateFormat="*AUTO")
{
    this.date = date.trim();
  this.format = dateFormat.trim().toUpperCase();
  this.allowedFormats = ['','*AUTO','AUTO','*ISO','ISO','*ISO0','ISO0','*USA','USA','*USA0','USA0']

  var formatConvertor = {
                            'ISO':this.toISO,
                            '*ISO':this.toISO,
                            'ISO0':this.toISO0,
                            '*ISO0':this.toISO0,
                        } 

  this.seperator="";
  this.result;
  this.year;
  this.month;
  this.day;
  this.JSDate;
//---------------------------------------------------------------------
//  toString
//---------------------------------------------------------------------  

this.toString = function()
{
    return this.date;
}
//---------------------------------------------------------------------
//  Chcek is date format is allowed or not
//---------------------------------------------------------------------  

  if(!this.allowedFormats.includes(this.format))
  {
      throw "This Date format not supported : " + this.format;
  }

//---------------------------------------------------------------------
//
//---------------------------------------------------------------------  
this.setFromJSDate(jsDate)
{   
    if(jsDate instanceof Date && !isNaN(jsDate.valueOf()))
    {
        var today   = new Date(jsDate.setHours(0, 0, 0, 0));
    
        this.date   = today.getFullYear()+'-'+ (today.getMonth() + 1).toString().padStart(2, '0')+'-'+ today.getDate().toString().padStart(2, '0');
        this.year   = today.getFullYear();
        this.month  = (today.getMonth() + 1);
        this.day    = today.getDate();
    }

}

if(this.date.length ==0 )
  {
    this.setFromJSDate(new Date())
  }

this.getJSDate= function(){
    var d = new Date(this.year, this.month - 1, this.day );
    var today   = new Date(d.setHours(0, 0, 0, 0));
    return today;
}

this.addDays= function(val){
    var days =  parseInt(val);
    if(isNaN(days))
    {
        throw "Invalid value for the days";
    }

    var date = this.getJSDate();
    today.setDate(date.getDate() + days);

}  



//---------------------------------------------------------------------
//
//---------------------------------------------------------------------
this.isISOFormat = function(){
    let iso = /([1-2][0-9]{3})-([0-1][0-9]|[1-9])-([0-3][0-9]|[1-9])(\d*)/;
    let isoResult = this.date.match(iso);
    if(verifyFormat(isoResult)){
        this.format = "*ISO";
        this.year = isoResult[1];
        this.month = isoResult[2];
        this.day = isoResult[3];
        return isoResult
    }
    return false;
  }
 //---------------------------------------------------------------------
//
//---------------------------------------------------------------------
  this.isISO0Format = function(){
    let iso0 = /([1-2][0-9]{3})([0-1][0-9]|[1-9])([0-3][0-9]|[1-9])(\d*)/;
    let iso0Result = this.date.match(iso0);
    if(verifyFormat(iso0Result)){
        this.format = "*ISO0";
        this.year = iso0Result[1];
        this.month = iso0Result[2];
        this.day = iso0Result[3];
        return iso0Result
    }
    return false;
  }  
//---------------------------------------------------------------------
//
//---------------------------------------------------------------------
  this.isUSAFormat = function(){
    let usa = /([0-1][0-9]|[1-9])\/([0-3][0-9]|[1-9])\/([1-2][0-9]{3})(\d*)/;
    let usaResult = this.date.match(usa);
    if(verifyFormat(usaResult)){
        alert("isUSAFormat")
        this.format = "*USA";
        this.month = usaResult[1];
        this.day = usaResult[2];
        this.year = usaResult[3];
        return usaResult
    }
    return false;
  }  
//---------------------------------------------------------------------
//
//---------------------------------------------------------------------
  this.isUSA0Format = function(){
    let usa0 = /([0-1][0-9]|[1-9])([0-3][0-9]|[1-9])([1-2][0-9]{3})(\d*)/;
    let usa0Result = this.date.match(usa0);
    if(verifyFormat(usa0Result)){
        this.format = "*USA0";
        this.month = usa0Result[1];
        this.day = usa0Result[2];
        this.year = usa0Result[3];
        return usa0Result
    }
    return false;
  }  
//--------------------------------------------------------------------------
//-  CONVERT to ISO  YYYY-MM-DD
//--------------------------------------------------------------------------
this.toISO = function(){
    this.date = this.year + '-' + this.month.toString().padStart(2, '0') + '-' + this.day.toString().padStart(2, '0');
    if(!this.isISOFormat())
    {
        throw "Convertion error: can not convert the date to ISO format"
    }
}
//--------------------------------------------------------------------------
//-  CONVERT to ISO0   YYYYMMDD
//--------------------------------------------------------------------------
this.toISO0 = function(){
    this.date = this.year + '' + this.month.toString().padStart(2, '0') + '' + this.day.toString().padStart(2, '0');
    if(!this.isISO0Format())
    {
        throw "Convertion error: can not convert the date to ISO0 format"
    }
}

//--------------------------------------------------------------------------
//-  CONVERT to USA   MM/DD/YYYY
//--------------------------------------------------------------------------
this.toUSA = function(){
    this.date = this.month.toString().padStart(2, '0') + '/' + this.day.toString().padStart(2, '0')+'/'+this.year 
    if(!this.isUSAFormat())
    {
        throw "Convertion error: can not convert the date to USA format"
    }
}
//--------------------------------------------------------------------------
//-  CONVERT to USA0   MMDDYYYY
//--------------------------------------------------------------------------
this.toUSA0 = function(){
    this.date = this.month.toString().padStart(2, '0') + '' + this.day.toString().padStart(2, '0')+''+this.year 
    if(!this.isUSA0Format())
    {
        throw "Convertion error: can not convert the date to USA0 format"
    }
}

//---------------------------------------------------------------------
//
//---------------------------------------------------------------------
  this.idDateFormat = function(){
  
    let isoResult = this.isISOFormat();
    let usaResult = this.isUSAFormat();
    let iso0Result = this.isISO0Format();
    let usa0Result = this.isUSA0Format();

        console.log(isoResult);
        console.log(usaResult);
        console.log(iso0Result);
        console.log(usa0Result);

      if(!(isoResult===false)) return isoResult;
      if(!(usaResult===false)) return usaResult;
      if(!(iso0Result===false)) return iso0Result;
      if(!(usa0Result===false)) return usa0Result;

      return false;
  }
//---------------------------------------------------------------------
//
//---------------------------------------------------------------------
  var verifyFormat= function(regExResult){
        if((regExResult === null) || (regExResult===undefined) || (regExResult == false))
        {
            return false;
        }
        if(regExResult[4] =="" || regExResult[4] ===null|| regExResult[4] ===undefined)
        {
            return true;
        }

        return false;
  }
//---------------------------------------------------------------------
//
//---------------------------------------------------------------------
  if((this.date !="") && (this.format == "*AUTO" || this.format==""))
  {
       this.result = this.idDateFormat();
      if(!this.result){
          throw "Date format is not identified";
      }
  }

//---------------------------------------------------------------------
//
//---------------------------------------------------------------------  
  if((this.date !="") && (this.format == "*ISO" || this.format == "ISO"))
  {
       this.result = this.isISOFormat();
      if(!this.result){
          throw "Invalid ISO date format";
      }
  }

//---------------------------------------------------------------------
//
//---------------------------------------------------------------------  
  if((this.date !="") && (this.format == "*ISO0" || this.format == "ISO0"))
  {
       this.result = this.isISO0Format();
      if(!this.result){
          throw "Invalid ISO date format";
      }
  }

//---------------------------------------------------------------------
//
//---------------------------------------------------------------------
  if((this.date !="") && (this.format == "*USA" || this.format == "USA"))
  {
       this.result = this.isUSAFormat();
      if(!this.result){
          throw "Invalid USA date format";
      }
  }

//---------------------------------------------------------------------
//
//---------------------------------------------------------------------  
  if((this.date !="") && (this.format == "*USA0" || this.format == "USA0"))
  {
       this.result = this.isUSA0Format();
      if(!this.result){
          throw "Invalid USA0 date format";
      }
  }
//---------------------------------------------------------------------
//
//---------------------------------------------------------------------  
}
