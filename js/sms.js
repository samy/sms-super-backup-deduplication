var xmlContent;
$(document).ready(function() {
	$(document).on('click','#launch',function() {
		$.ajax( {
            type: "GET",
            url: "sms_20131019231723.xml",
            dataType: "xml",
            success: function(xml) {
				displaySMS(xml);
			}
        }
      );    
	});
});
function displaySMS(xmlSource) {
	var ids = new Array();
	var duplicates= 0;
	
	$(xmlSource).find('allsms sms').each(function(index,e) {
		if (ids.indexOf($(this).attr('address')+$(this).attr('date'))==-1) {
			ids.push($(this).attr('address')+$(this).attr('date'));
		} else {
			
			duplicates+=1;
			$(this).remove();
			console.log($(this));
		}
	});
	
	if (duplicates>0) {
		$('#txt').append('Doublons :'+duplicates);
	}
	
	$('#txt').append('<p>Résultat</p>');
	var blob = new Blob([XMLToString(xmlSource)], {type: "text/xml;charset=utf-8"});
	saveAs(blob, "test.xml");
}

/* Source : http://www.dotnet-tricks.com/Tutorial/javascript/Y7Q9130612-Convert-string-to-xml-and-xml-to-string-using-javascript.html*/
function XMLToString(oXML)
{
	 //code for IE
	 if (window.ActiveXObject) {
	 var oString = oXML.xml; return oString;
	 } 
	 // code for Chrome, Safari, Firefox, Opera, etc.
	 else {
		
	 return (new XMLSerializer()).serializeToString(oXML);
	 }
 }