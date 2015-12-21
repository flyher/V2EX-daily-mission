/// <reference path="../../reactexe/moduletest/js/lib/jquery-1.11.2.min.js" />

(function ($) {
    var v2exDaily = {
        logPage: 1,
        uname: "",
        showLoading: function (value) {
            if (value == true) {
                $('#loading')[0].style.display = 'block';
                $('#loading').addClass('loading');
            } else {
                $('#loading')[0].style.display = 'none';
                $('#loading').removeClass('loading');
            }
            $('#uname')[0].disabled = value;
            $('#pword')[0].disabled = value;
        },
        startEdit: function (btn) {
            $("#uname")[0].value = btn.name == "new" ? "" : btn.value;
            $("#pword")[0].value = "";
            $('.alert').hide();

            $('#modalNewEdit').modal({
                keyboard: false,
                show: true,
                backdrop: "static"
            });
        },
        sendData: function (url, type, data) {
            $.ajax({
                type: type,
                url: url,
                data: data,
                beforeSend: function (XMLHttpRequest) {
                    v2exDaily.showLoading(true);
                    $('.alert').hide();
                },
                success: function (txtResponse, txtStatus) {
                    if (txtResponse == 'OK') {
                        location.reload();
                    } else {
                        if (data.action.substring(0, 6) == 'redeem') {
                            alert(txtResponse);
                        } else {
                            $("#login-info-text")[0].innerHTML = txtResponse;
                            $(".alert").show();
                        }
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {
                    v2exDaily.showLoading(false);
                },
                error: function (data) {
                    //showLoading(false);
                    alert("错误，请重试.");
                }
            });
        },
        completeEdit: function () {
            v2exDaily.sendData('/', 'post', {
                "action": "login",
                "u": $("#uname")[0].value,
                "p": $("#pword")[0].value,
            });
        },
        actionVUser: function (btn) {
            if (btn.name == 'delete') {
                var r = confirm("确实要删除该账户吗？")
                if (r == false) return;
            }
            if (btn.name == 'enable') {
                var r = confirm("取消操作将不再为该账户自动签到，并且删除已保存的Cookies，重新启用则需要重新登录才能生效。\n是否继续？")
                if (r == false) return;
            }

            v2exDaily.sendData('/', 'post', {
                "action": btn.name,
                "u": btn.value
            });
        },
        checkLog: function (btn) {
            $('#modalLog').modal({
                keyboard: false,
                show: true,
                backdrop: "static"
            });
            this.uname = btn.value;
            this.logPage = 1
            this.changeLogPage(0);
        },
        changeLogPage: function (n) {
            $('.alert').hide();
            ($("#log tbody")).remove();

            $('#log-loading')[0].style.display = 'block';
            $('#log-loading').addClass('loading');

            $.ajax({
                type: "post",
                async: true,
                data: {
                    'action': 'log',
                    'u': v2exDaily.uname,
                    'page':v2exDaily.logPage + n
                },
                dataType: 'json',
                url: '/',
                success: function (data, txtStatus) {
                    ($("#log")).append(data.data);
                    v2exDaily.logPage = data.page;
                    if (data.prev == 'True') {
                        $('#log-page-pre')[0].style.display = 'block';
                        $('#log-page-nopre')[0].style.display = 'none';
                    } else {
                        $('#log-page-pre')[0].style.display = 'none';
                        $('#log-page-nopre')[0].style.display = 'block';
                    }
                    if (data.next == 'True') {
                        $('#log-page-next')[0].style.display = 'block';
                        $('#log-page-nonext')[0].style.display = 'none';
                    } else {
                        $('#log-page-next')[0].style.display = 'none';
                        $('#log-page-nonext')[0].style.display = 'block';
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {
                    $('#log-loading')[0].style.display = 'none';
                    $('#log-loading').removeClass('loading');
                },
                error: function (data) {
                    //alert(data.responseText);
                    $("#log-info-text")[0].innerHTML = data.responseText;
                    $(".alert").show();
                }
            });
        }
    };
    $.v2exDaily = v2exDaily;

})(jQuery);

function startEdit(btn) {
    $.v2exDaily.startEdit(btn);
}

function completeEdit() {
    $.v2exDaily.completeEdit();
}
function actionVUser(btn) {
    $.v2exDaily.actionVUser(btn);
}
function checkLog(btn) {
    $.v2exDaily.checkLog(btn);
}