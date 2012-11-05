"use strict";


$(document).ready(function () {

	// Attach closing action
	$('.btn-close').click(function(e) {
		Media.Panel.showList();
		e.preventDefault();
	});

	// Attach
	$('.btn-save').click(function (e) {
		$('#form-media').submit();
		e.preventDefault();
	});

	// Attach
	Media.Event.add();

	/**
	 * Table initialisation
	 *
	 * Internal note: properties of Datatables have prefix: m, b, s, i, o, a, fn etc...
	 * this corresponds to the variable type e.g. mixed, boolean, string, integer, object, array, function
	 */
	Media.Table = $('#example').dataTable({
		"bProcessing": true,
		"bServerSide": true,
		"sAjaxSource": "/typo3/mod.php",
		"fnServerParams": function (aoData) {
			aoData.push({ "name": "M", "value": "user_MediaTxMediaM1" });
			aoData.push({ "name": "tx_media_user_mediatxmediam1[action]", "value": "listRow" });
			aoData.push({ "name": "tx_media_user_mediatxmediam1[controller]", "value": "Media" });
			aoData.push({ "name": "tx_media_user_mediatxmediam1[format]", "value": "json" });
		},
		"aoColumns": Media._columns,
		"aLengthMenu": [
			[10, 25, 50, 100, -1],
			[10, 25, 50, 100, "All"]
		],
//		@todo can be removed if table tools utility get dropped - under investigation
//		"oTableTools": {
//			"sRowSelect": "multi",
//			"fnRowSelected": function (node) {
//				console.log(node.id);
//				console.log(node);
//			}
//		},
		"fnDrawCallback": function () {
			// Attach event to DOM elements
			Media.Event.edit();
			Media.Event.delete();

			// Handle flash message
			Media.FlashMessage.display();
		}
	});

});

/** @namespace Media */

/**
 * Formatting a string
 *
 * @param {string} key
 */
Media.format = function (key) {
	var s = Media.Language.get(key),
		i = arguments.length + 1;

	while (i--) {
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i + 1]);
	}
	return s;
}

/**
 * Shorthand method for translating a string
 *
 * @param {string} key
 */
Media.translate = function (key) {
	return Media.Language.get(key);
}