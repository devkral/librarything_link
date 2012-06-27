//if the method is not implemented
if (!String.trim) {
 String.prototype.trim = function () {
  return this.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '');
  };
}


function newlines_to_onespace(input)
{
	return input.replace(/\s+/g,' ')
}


//just intern
function swap_helper(a,b,c)
{
    return c+b;
}

function swap_name(input)
{
	wo=input.replace(/(^.+) (.+$)/,swap_helper);
	return wo.replace(/ /g,'');
}

//still contains unencoded utf8 characters
function transform_to_name(input)
{
	workobject=newlines_to_onespace(input).toLowerCase();
	var temp1;
	temp1=workobject.lastIndexOf(':');
	if (temp1!=-1)
	{
		workobject=workobject.substring(temp1+1); //autocomplete end
	}
	
	temp1=workobject.lastIndexOf('/');
	if (temp1!=-1)
	{
		workobject=workobject.substring(temp1+1); //autocomplete end
	}
	
	temp1=workobject.IndexOf('(');
	if (temp1!=-1)
	{
		workobject=workobject.substring(0,temp1);
		//workobject=workobject.substring(temp1+1); //autocomplete end
		//workobject=workobject.substring(0,workobject.lastIndexOf(')')); // dismiss the closing ')' sign (why is workobject.lastIndexOf(')')-1 wrong? )
	}

	//part two: adjust the names to standards	
	workobject=workobject.replace(/\u0027/g,'');
	
	//remove - between compound names
	workobject=workobject.replace(/-/g,'');
	
	//acording to http://www.fileformat.info/info/unicode/block/latin_supplement/list.htm
	//character s
	workobject=workobject.replace(/\u00df/g,'s');
	//character a
	workobject=workobject.replace(/[\u00e0-\u00e6]/g,'a');
	//character c
	workobject=workobject.replace(/\u00e7/g,'c');
	//character e
	workobject=workobject.replace(/[\u00e8-\u00eb]/g,'e');
	workobject=workobject.replace(/\u00f0/g,'e');
	//character i
	workobject=workobject.replace(/[\u00ec-\u00ef]/g,'i');
	//character n
	workobject=workobject.replace(/\u00f1/g,'n');
	//character o (includes division sign)
	workobject=workobject.replace(/[\u00f2-\u00f8]/g,'o');
	/////workobject=workobject.replace(/\u00f8/g,'o');
	//character u
	workobject=workobject.replace(/[\u00f9-\u00fd]/g,'u');
	//character y (includes thorn a char I don't know)
	workobject=workobject.replace(/[\u00fd-\u00ff]/g,'y');
	////character t
	////workobject=workobject.replace(/\u00fe/g,'t');
	
	workobject=workobject.trim(); //remove trailing spaces
	
	//now perform operations with a clean object
	
	workobject=swap_name(workobject);
	workobject=workobject.substring(0,20);
	return workobject;
}

//detect names in wikipedia
function detect_names(input)
{
//<h1 id="firstHeading" class="firstHeading"><span dir="auto">Günter Grass</span></h1>
		
	workobject=input;
	workobject=workobject.substr(workobject.indexOf('\"firstHeading\"'),workobject.indexOf('\<\/span'));
	workobject=workobject.replace(/.*\>(.*)\<\/.*/,"$1");
	return transform_to_name(workobject);
}
