var DB = DB || {
        BaseUrl: "https://api.designbold.com/",
        Version: "v2"
    };
"undefined" == typeof DB.BaseUrl && (DB.BaseUrl = "https://api.designbold.com/"), "undefined" == typeof DB.Version && (DB.Version = "v2"),
    function() {
        DB.extendEach = function() {
            var a = Array.prototype.slice.call(arguments),
                b = this;
            return _.each(a, function(a) {
                b = b.extend(a)
            }), b
        }, Backbone.Model.extendEach = DB.extendEach, Backbone.Collection.extendEach = DB.extendEach, Backbone.Router.extendEach = DB.extendEach, Backbone.View.extendEach = DB.extendEach
    }(), DB.AjaxManager = function() {
    var a = [];
    return {
        addReq: function(b) {
            a.push(b)
        },
        removeReq: function(b) {
            $.inArray(b, a) > -1 && a.splice($.inArray(b, a), 1)
        },
        run: function() {
            var b, c = this;
            a.length ? (b = a[0].complete, a[0].complete = function() {
                "function" == typeof b && b(), a.shift(), c.run.apply(c, [])
            }, $.ajax(a[0])) : c.tid = setTimeout(function() {
                c.run.apply(c, [])
            }, 1e3)
        },
        stop: function() {
            a = [], clearTimeout(this.tid)
        }
    }
}(), DB.refreshAccessToken = function(a) {
    return "undefined" == typeof DB.RefreshTokenUri ? (confirm("Your access token was expired. Wanna reload page to obstain a new one?") && window.location.reload(!0), !1) : ($("body").addClass("db-disabled"), void $.ajax({
        url: DB.RefreshTokenUri,
        type: "GET",
        dataType: "json",
        success: function(b) {
            "undefined" != typeof b.access_token ? (DB.Token = b.access_token, a.data = _.extend({}, a.data, {
                access_token: DB.Token
            }), DB.setupAccessToken(), $.ajax(a)) : (alert("Failed to auto retrieve new access token. Browser wil reload to obstain a new one."), window.location.reload(!0)), $("body").removeClass("db-disabled")
        },
        error: function(a) {
            console.log(a.responseText), confirm("Your access token was expired. Wanna reload page to obstain a new one?") && window.location.reload(!0)
        }
    }))
};
var originalSync = Backbone.sync;
DB.setupAccessToken = function() {
    Backbone.sync = function(a, b, c) {
        var d, e;
        return e = $.Deferred(), c && e.then(c.success, c.error), "patch" == a || "update" == a || "put" == a || "create" == a ? ("undefined" == typeof c.attrs && (c.attrs = {}), c.attrs = _.extend({}, c.attrs, {
            access_token: DB.Token
        }), "create" == a && (c.attrs = _.extend(c.attrs, b.attributes))) : ("undefined" == typeof c.data && (c.data = {}), c.data = _.extend({}, c.data, {
            access_token: DB.Token
        })), d = originalSync(a, b, _.omit(c, "success", "error")), $("body").hasClass("db-disabled") && "undefined" == typeof DB.RefreshTokenUri && b.url.indexOf(-1 == DB.RefreshTokenUri) && d.abort(), d.done(e.resolve), d.fail(function() {
            if (200 === d.status && "" === d.responseText) e.resolve.apply(d, arguments);
            else if ("undefined" != typeof navigator.onLine && navigator.onLine === !1 && $("body .panel-error").length <= 0) {
                if (DB.AjaxManager.stop(), $("body .panel-error").remove(), "undefined" != typeof _ && "function" == typeof _.template) {
                    var f = _.template($("#connection_lost_tmpl").html())({
                        reload: 0,
                        title: "No internet connection!",
                        message: "Oops! It looks like your device has lost the internet connection."
                    });
                    $("body .main, body .layer").addClass("page-blur"), $("body").prepend(f), $("body .panel-error a").off("click").on("click", function() {
                        $("body .panel-error").fadeOut(), $("body .main, body .layer").removeClass("page-blur")
                    })
                }
            } else 401 === d.status ? ("read" == a && (a = "get"), c = _.extend(c, {
                method: a,
                url: b.url
            }), DB.refreshAccessToken(c)) : 403 == d.status && DB.View.prototype.popupLoginModal(), e.reject.apply(d, arguments)
        }), e.promise()
    }, $.ajaxSetup({
        data: {
            access_token: DB.Token
        },
        beforeSend: function(a, b) {
            $("body").hasClass("db-disabled") && "undefined" == typeof DB.RefreshTokenUri && b.url.indexOf(-1 == DB.RefreshTokenUri) && a.abort()
        },
        error: function(a) {
            if (401 === a.status) DB.refreshAccessToken(this);
            else if ("undefined" != typeof navigator.onLine && navigator.onLine === !1 && $("body .panel-error").length <= 0) {
                if (DB.AjaxManager.stop(), $("body .panel-error").remove(), "undefined" != typeof _ && "function" == typeof _.template) {
                    var b = _.template($("#connection_lost_tmpl").html())({
                        reload: 0,
                        title: "No internet connection!",
                        message: "Oops! It looks like your device has lost the internet connection."
                    });
                    $("body .main, body .layer").addClass("page-blur"), $("body").prepend(b), $("body .panel-error a").off("click").on("click", function() {
                        $("body .panel-error").fadeOut(), $("body .main, body .layer").removeClass("page-blur")
                    })
                }
            } else DB.View.prototype.pushNotification({
                type: 406 == a.status ? "warning" : "error",
                message: a.responseJSON.msg
            })
        }
    })
}, DB.setupAccessToken(), DB.BaseApi = DB.BaseUrl + DB.Version + "/", DB.EventBus = _({}).extend(Backbone.Events), DB.User = Backbone.Model.extend({
    idAttribute: "_id",
    initialize: function() {
        this.url = DB.BaseApi + "user/me"
    },
    toSaveUserEmail: function() {
        this.url = DB.BaseApi + "user/email"
    },
    toSaveUserPassword: function() {
        this.url = DB.BaseApi + "user/password"
    },
    toSaveUserCredit: function() {
        this.url = DB.BaseApi + "user/credit"
    },
    toSaveUserFollow: function() {
        this.url = DB.BaseApi + "user/" + this.id + "/follow"
    },
    toSaveUserAvatar: function() {
        this.url = DB.BaseApi + "user/avatar"
    },
    toSaveUserCover: function() {
        this.url = DB.BaseApi + "user/cover"
    },
    toUploadDesignImage: function() {
        this.url = DB.BaseApi + "user/upload"
    },
    toOauthLogin: function() {
        this.url = DB.OauthClientUri + "login"
    },
    toOauthRegister: function() {
        this.url = DB.OauthClientUri + "register"
    },
    toOauthVerifyEmail: function() {
        this.url = DB.OauthClientUri + "verify-email"
    },
    toApplyContributor: function() {
        this.url = DB.BaseApi + "user/contributor/apply"
    },
    toSendContact: function() {
        this.url = DB.BaseApi + "user/contact/send"
    },
    toRechargeCredit: function() {
        this.url = DB.BaseApi + "user/recharge"
    },
    resetUrl: function() {
        this.url = DB.BaseApi + "user/me"
    },
    parse: function(a) {
        return a.response
    }
}), DB.User.prototype.onError = function(a, b, c) {
    console.warn("DB.User::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.Document = Backbone.Model.extend({
    idAttribute: "_id",
    initialize: function() {
        this.url = DB.BaseApi + "document/" + this.id
    },
    toAddDocument: function(a) {
        this.url = DB.BaseApi + "document/" + a
    },
    toCreateDocument: function() {
        this.url = DB.BaseApi + "document"
    },
    toSaveDocumentLike: function() {
        this.url = DB.BaseApi + "document/" + this.id + "/like"
    },
    toSaveDocumentComment: function() {
        this.url = DB.BaseApi + "document/" + this.id + "/comment"
    },
    toFetchDocumentVersion: function() {
        this.url = DB.BaseApi + "document/" + this.id + "/version"
    },
    toSaveDocument: function() {
        this.url = DB.BaseApi + "document/" + this.id + "/save"
    },
    toRenderDocument: function() {
        this.url = DB.BaseApi + "document/" + this.id + "/render"
    },
    toExportDocument: function() {
        var a = new Date;
        this.url = DB.BaseApi + "document/" + this.id + "/export?" + a.getTime()
    },
    toDownloadDocument: function() {
        this.url = DB.BaseApi + "document/" + this.id + "/download"
    },
    toUpdateDocumentActive: function() {
        this.url = DB.BaseApi + "document/" + this.id + "/active"
    },
    toSubmitDocument: function() {
        this.url = DB.BaseApi + "user/document/" + this.id + "/submit"
    },
    toShareDocument: function() {
        this.url = DB.BaseApi + "document/" + this.id + "/share"
    },
    toMoveDocument: function() {
        this.url = DB.BaseApi + "document/" + this.id + "/move"
    },
    toCheckoutDocument: function() {
        this.url = DB.BaseApi + "document/" + this.id + "/checkout"
    },
    toPayoutDocument: function() {
        this.url = DB.BaseApi + "document/" + this.id + "/payout"
    },
    resetUrl: function() {
        this.url = DB.BaseApi + "document/" + this.id
    },
    parse: function(a) {
        return "undefined" != typeof a.response ? a.response : a
    }
}), DB.Document.prototype.onError = function(a, b, c) {
    console.warn("DB.Document::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.Design = Backbone.Model.extend({
    idAttribute: "_id",
    initialize: function() {
        this.url = DB.BaseApi + "design/" + this.id
    },
    toFetchDesignVersion: function() {
        this.url = DB.BaseApi + "design/" + this.id + "/version"
    },
    toSaveDesign: function() {
        this.url = DB.BaseApi + "design/" + this.id + "/save"
    },
    toRenderDesign: function() {
        this.url = DB.BaseApi + "design/" + this.id + "/render"
    },
    toExportDesign: function(a) {
        this.url = DB.BaseApi + "design/" + this.id + "/export/" + a
    },
    resetUrl: function() {
        this.url = DB.BaseApi + "design/" + this.id
    },
    parse: function(a) {
        return "undefined" != typeof a.response ? a.response : a
    }
}), DB.Design.prototype.onError = function(a, b, c) {
    console.warn("DB.Design::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.DocumentType = Backbone.Model.extend(), DB.DocumentType.prototype.onError = function(a, b, c) {
    console.warn("DB.DocumentType::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.Media = Backbone.Model.extend({
    idAttribute: "_id",
    initialize: function() {
        this.url = DB.BaseApi + "media/" + this.id
    },
    toFetchLayoutVersion: function() {
        this.url = DB.BaseApi + "media/" + this.id + "/version"
    },
    toSaveLayout: function() {
        this.url = DB.BaseApi + "media/" + this.id + "/save"
    },
    toRenderLayout: function() {
        this.url = DB.BaseApi + "media/" + this.id + "/render"
    },
    toGenerateLayoutFiles: function() {
        this.url = DB.BaseApi + "media/" + this.id + "/generate"
    },
    toStartImportUpload: function() {
        this.url = DB.BaseApi + "media/file"
    },
    toFinishImportUpload: function() {
        this.url = DB.BaseApi + "media/" + this.id + "/file"
    },
    toDeleteUploadImage: function() {
        this.url = DB.BaseApi + "user/uploads/" + this.id
    },
    resetUrl: function() {
        this.url = DB.BaseApi + "media/" + this.id
    }
}), DB.Media.prototype.onError = function(a, b, c) {
    console.warn("DB.Media::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.Workspace = Backbone.Model.extend({
    idAttribute: "_id"
}), DB.Workspace.prototype.onError = function(a, b, c) {
    console.warn("DB.Workspace::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.UserLabel = Backbone.Model.extend({
    idAttribute: "_id",
    initialize: function() {
        this.url = DB.BaseApi + "user/label"
    },
    toUpdateLabel: function() {
        this.url = DB.BaseApi + "user/label/" + this.id
    },
    toDeleteLabel: function() {
        this.url = DB.BaseApi + "user/label/" + this.id
    },
    resetUrl: function() {
        this.url = DB.BaseApi + "user/label"
    }
}), DB.UserLabel.prototype.onError = function(a, b, c) {
    console.warn("DB.UserLabel::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.Faq = Backbone.Model.extend({
    idAttribute: "_id",
    initialize: function() {
        this.url = DB.BaseApi + "faq/" + this.id
    },
    toSubmitIssue: function() {
        this.url = DB.BaseApi + "faq/ticket"
    },
    resetUrl: function() {
        this.url = DB.BaseApi + "faq/" + this.id
    }
}), DB.Faq.prototype.onError = function(a, b, c) {
    console.warn("DB.Faq::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.UserInvoice = Backbone.Model.extend({
    idAttribute: "_id",
    initialize: function() {
        this.url = DB.BaseApi + "user/invoices/" + this.id
    },
    resetUrl: function() {
        this.url = DB.BaseApi + "user/invoices/" + this.id
    }
}), DB.UserInvoice.prototype.onError = function(a, b, c) {
    console.warn("DB.UserInvoice::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.Documents = Backbone.Collection.extend({
    model: DB.Document,
    initialize: function() {
        this.url = DB.BaseApi + "document"
    },
    parse: function(a) {
        return _.toArray(a.response)
    },
    toFetchUserDocument: function(a) {
        "undefined" == typeof a && (a = "me"), this.url = DB.BaseApi + "user/" + a + "/documents"
    },
    resetUrl: function() {
        this.url = DB.BaseApi + "document"
    }
}), DB.Documents.prototype.onError = function(a, b, c) {
    console.warn("DB.Documents::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.DocumentTypes = Backbone.Collection.extend({
    model: DB.DocumentType,
    initialize: function() {
        this.url = DB.BaseApi + "document/type"
    },
    parse: function(a) {
        return a.response
    }
}), DB.DocumentTypes.prototype.onError = function(a, b, c) {
    console.warn("DB.DocumentTypes::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.Medias = Backbone.Collection.extend({
    model: DB.Media,
    initialize: function() {
        this.url = DB.BaseApi + "media"
    },
    parse: function(a) {
        return a.response
    },
    toFetchLayouts: function() {
        this.url = DB.BaseApi + "media?type=D"
    },
    toFetchBackgrounds: function() {
        this.url = DB.BaseApi + "media?type=RV&bgr=1"
    },
    toFetchTexts: function() {
        this.url = DB.BaseApi + "media?type=V&q=text"
    },
    toFetchUploads: function() {
        this.url = DB.BaseApi + "media/uploads"
    },
    toFetchSearchs: function() {
        this.url = DB.BaseApi + "media?type=RV"
    },
    toFetchRecents: function() {
        this.url = DB.BaseApi + "media/recent"
    },
    resetUrl: function() {
        this.url = DB.BaseApi + "media"
    }
}), DB.Medias.prototype.onError = function(a, b, c) {
    console.warn("DB.Medias::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.Users = Backbone.Collection.extend({
    model: DB.User,
    initialize: function() {
        this.url = DB.BaseApi + "user"
    },
    toFetchUserFollowers: function(a) {
        this.url = DB.BaseApi + "user/" + a + "/followers"
    },
    toFetchUserFollowing: function(a) {
        this.url = DB.BaseApi + "user/" + a + "/following"
    },
    parse: function(a) {
        return a.response
    }
}), DB.Users.prototype.onError = function(a, b, c) {
    console.warn("DB.Users::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.Workspaces = Backbone.Collection.extend({
    model: DB.Workspace,
    initialize: function() {
        this.url = DB.BaseApi + "user/workspace"
    },
    resetUrl: function() {
        this.url = DB.BaseApi + "user/workspace"
    },
    parse: function(a) {
        return a.response
    }
}), DB.Workspaces.prototype.onError = function(a, b, c) {
    console.warn("DB.Workspaces::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.UserLabels = Backbone.Collection.extend({
    model: DB.UserLabel,
    initialize: function() {
        this.url = DB.BaseApi + "user/label"
    },
    toFetchUserLabels: function(a) {
        this.url = DB.BaseApi + "user/" + a + "/label"
    },
    resetUrl: function() {
        this.url = DB.BaseApi + "user/label"
    },
    parse: function(a) {
        return a.response
    }
}), DB.UserLabels.prototype.onError = function(a, b, c) {
    console.warn("DB.UserLabels::onError when requesting: " + a.url);
    try {
        console.warn(b.responseText)
    } catch (d) {}
}, DB.Faqs = Backbone.Collection.extend({
    model: DB.Faq,
    initialize: function() {
        this.url = DB.BaseApi + "faq"
    },
    parse: function(a) {
        return a.response
    }
}), DB.UserInvoices = Backbone.Collection.extend({
    model: DB.UserInvoice,
    initialize: function() {
        this.url = DB.BaseApi + "user/invoices"
    },
    resetUrl: function() {
        this.url = DB.BaseApi + "user/invoices"
    },
    parse: function(a) {
        return a.response
    }
}), DB.View = Backbone.View.extend({
    el: $("body"),
    maximumTitle: 60,
    initialize: function() {
        var a = this;
        a.startDBLoader()
    },
    events: {
        "click .navbar #navbar .navbar-nav .create-new": "toggleCreateDesignModal",
        "click .support_bottom, .box_help_three .close_mess": "toggleSupportBox",
        "click .box_help .close": "closeSupportBox",
        "click .box_help_one .send_mess": "toggleSupportSubmitIssue",
        "keyup .box_help .input_search_help": "triggerSearchFaq",
        "click .box_help .search-btn": "triggerSearchFaq",
        "click .box_help_two .send_mess": "triggerSubmitFaq",
        "click .topbar .userbar-login a, a.nav-login-signup": "popupLoginModal",
        "click #modal-login .login-social a": "triggerSocialLogin",
        "click #modal-login .modal-switch": "triggerSwitchModal",
        "click #modal-login .btn-login": "requestOauthApi",
        "click #modal-contributor #btn-submit": "triggerApplyContributor",
        "click .contact-box #contact-send": "triggerSendContact"
    },
    startDBLoader: function() {
        function a() {
            var a = $("#loading-animation"),
                b = $("#preloader");
            a.fadeOut(), b.delay(c).fadeOut(d)
        }
        var b = this,
            c = 550,
            d = 800;
        a(), $(window).scroll(function() {
            $(".db-navbar").offset().top > 50 ? $(".db-navbar").addClass("top-nav-collapse") : $(".db-navbar").removeClass("top-nav-collapse");
        }), $(".dropdown-toggle").dropdown(), $('[data-toggle="tooltip"]').tooltip(), $(".dropdown").on("show.bs.dropdown", function(a) {
            var b = $(this).find(".dropdown-menu"),
                c = parseInt(b.css("margin-top"));
            b.css({
                "margin-top": c + 10 + "px",
                opacity: 0
            }).animate({
                "margin-top": c + "px",
                opacity: 1
            }, 250, function() {
                $(this).css({
                    "margin-top": ""
                })
            })
        }), $(".dropdown").on("hide.bs.dropdown", function(a) {
            var b = $(this).find(".dropdown-menu"),
                c = parseInt(b.css("margin-top"));
            b.css({
                "margin-top": c + "px",
                opacity: 1,
                display: "block"
            }).animate({
                "margin-top": c + 10 + "px",
                opacity: 0
            }, 250, function() {
                $(this).css({
                    "margin-top": "",
                    display: ""
                })
            })
        }), $(".notice").length > 0 && 1 != b.getCookie("user-hide-notice") && setTimeout(function() {
            $(".notice").removeClass("hidden").addClass("notice-show").find(".btn-gotit").removeAttr("onclick").off("click").on("click", function() {
                b.setCookie("user-hide-notice", 1, 7), $(".notice").removeClass("notice-show"), setTimeout(function() {
                    $(".notice").remove()
                }, 1e3)
            }), $(".notice .btn-send-again").off("click").on("click", function(a) {
                $.ajax({
                    url: "https://accounts.designbold.com/oauth2/v1/api/resend-email",
                    type: "POST",
                    dataType: "json",
                    data: {
                        access_token: DB.Token
                    },
                    success: function(a) {
                        b.pushNotification({
                            type: "success",
                            message: a.msg
                        })
                    }
                })
            })
        }, 5e3), "undefined" != typeof DBRouter && DBRouter instanceof DB.Router && b.startDBClicker()
    },
    startDBClicker: function() {
        $('body a[href]:not([href="#"],[href="javascript:;"],[target="_blank"],[data-stay="true"])').off("click").on("click", function(a) {
            var b = $(a.currentTarget).attr("href");
            if ("undefined" == typeof b) return !0;
            var c = DB.View.prototype.parseURL(b),
                d = c.pathname + c.search;
            return "" != c.hostname && "" != d ? (DBRouter.navigate(d, {
                trigger: !0
            }), !1) : void 0
        })
    },
    delegateDBLoader: function() {
        $(".dropdown").off("show.bs.dropdown"), $(".dropdown").off("hide.bs.dropdown")
    },
    toggleLeftBar: function(a) {
        this.$(".left_fix").toggleClass("active")
    },
    toggleCreateDesignModal: function() {
        var a = this;
        $(".fix-favorite img[data-src]").each(function() {
            var a = this,
                b = $('<img class="animated fadeIn"/>').attr("src", $(a).data("src")).attr("width", $(a).attr("width")).attr("height", $(a).attr("height")).on("load", function() {
                    this.complete && "undefined" != typeof this.naturalWidth && 0 != this.naturalWidth ? $(a).replaceWith(b) : console.log($(a).data("src") + " loading failed.")
                })
        }), $("body").addClass("show-favorite"), $(".fix-favorite").niceScroll({
            cursorcolor: "#00F"
        }), $(".fix-favorite .close-favorite").off("click").on("click", function() {
            $("body").removeClass("show-favorite")
        }), $(".fix-favorite .list_choose li").off("click").on("click", function(b) {
            if ($(".fix-favorite .list_choose li").removeClass("active"), $(b.currentTarget).addClass("active"), "block_custome_dimension" == $(b.currentTarget).data("target")) {
                $(".fix-favorite .item_list_choose .block_custome_dimension").removeClass("hidden"), $(".fix-favorite .item_list_choose ul").addClass("docTypeBlur"), $(".fix-favorite .item_list_choose .block_custome_dimension .docTypeCustomizeButton").on("click", function(a) {
                    var b = $(a.currentTarget).parent().find('input[name="width"]').val(),
                        c = $(a.currentTarget).parent().find('input[name="height"]').val(),
                        d = $(a.currentTarget).parent().find('select[name="unit"]').val();
                    if ("mm" == d) {
                        if (10.583333333332 > b || b > 1322.9166666665 || 10.583333333332 > c || c > 1322.9166666665) return void alert("Width and height must has value between of 10.583333333332 and 1322.9166666665")
                    } else if ("inch" == d) {
                        if (.416666666663 > b || b > 52.08333333333 || .416666666663 > c || c > 52.08333333333) return void alert("Width and height must has value between of 0.416666666663 and 52.08333333333")
                    } else if (40 > b || b > 5e3 || 40 > c || c > 5e3) return void alert("Width and height must has value between of 40 and 5000");
                    $("#custom_dimension_form").submit()
                });
                var c = "px";
                $('.fix-favorite .item_list_choose .block_custome_dimension select[name="unit"]').focus(function(a) {
                    c = $(a.currentTarget).val()
                }), $('.fix-favorite .item_list_choose .block_custome_dimension select[name="unit"]').change(function(b) {
                    var d = $('.fix-favorite .item_list_choose .block_custome_dimension input[name="width"]').val(),
                        e = $('.fix-favorite .item_list_choose .block_custome_dimension input[name="height"]').val();
                    d = "NaN" !== parseFloat(d) ? parseFloat(d) : 0, e = "NaN" !== parseFloat(e) ? parseFloat(e) : 0;
                    var f = $(b.currentTarget).val();
                    d > 0 && $('.fix-favorite .item_list_choose .block_custome_dimension input[name="width"]').val(a.convertUnitValue(d, c, f)), e > 0 && $('.fix-favorite .item_list_choose .block_custome_dimension input[name="height"]').val(a.convertUnitValue(e, c, f)), c = f
                })
            } else $(".fix-favorite .content-choose").removeClass("active").addClass("hidden"), $('.fix-favorite .content-choose[data-category="' + $(b.currentTarget).data("category") + '"]').addClass("active").removeClass("hidden")
        })
    },
    loadTopbarSearchDocument: function() {
        var a = this,
            b = a.page,
            c = 20,
            d = (b - 1) * c;
        a.is_fetching = 1, a.collection.documents.fetch({
            data: {
                start: d,
                limit: c,
                q: a.$('.searchbar input[name="q"]').val(),
                dt: a.$(".searchbar #search_param").val()
            },
            success: function(b) {
                a.render()
            }
        })
    },
    topbarSearchScroll: function() {
        var a = this;
        !a.is_fetching && a.isElementInViewport(a.$(".loading-icon")) && a.loadTopbarSearchDocument()
    },
    convertUnitValue: function(a, b, c) {
        var d;
        return "inch" == b || "in" == b ? d = "px" == c ? 96 * a : "cm" == c ? a / 96 * 2.54 : "mm" == c ? a / 96 * 25.4 : a : "px" == b ? d = "in" == c || "inch" == c ? a / 96 : "cm" == c ? a / 96 / 96 * 2.54 : "mm" == c ? a / 96 / 96 * 25.4 : a : "cm" == b ? d = "in" == c || "inch" == c ? a / 2.54 * 96 : "px" == c ? 96 * a * 96 / 2.54 : "mm" == c ? 10 * a : a : "mm" == b && (d = "in" == c || "inch" == c ? a / 25.4 * 96 : "px" == c ? 96 * a * 96 / 25.4 : "cm" == c ? a / 10 : a), d
    },
    isElementInViewport: function(a) {
        "function" == typeof jQuery && a instanceof jQuery && (a = a[0]);
        var b = a.getBoundingClientRect();
        return 0 == b.top && 0 == b.left && 0 == b.bottom && 0 == b.right ? 0 : b.top >= 0 && b.left >= 0 && b.bottom <= (window.innerHeight || document.documentElement.clientHeight) && b.right <= (window.innerWidth || document.documentElement.clientWidth) ? 1 : 0
    },
    viewDocument: function(a) {
        a.preventDefault(), a.stopPropagation();
        var b = this,
            c = $(a.currentTarget).data("id"),
            d = b.collection.documents.findWhere({
                _id: c
            });
        if ("undefined" == typeof d) return !1;
        if (0 != d.get("viewed") && d.has("viewed")) {
            var e = _.template($("#view-document-tmpl").html())(d.toJSON());
            b.$("#modal-view-document").html(e), b.viewDocumentModal(a)
        } else d.resetUrl(), d.fetch({
            success: function(c, e) {
                d.set("viewed", 1);
                var f = _.template($("#view-document-tmpl").html())(c.toJSON());
                b.$("#modal-view-document").html(f), b.collection.documents.set(d, {
                    remove: !1
                }), b.viewDocumentModal(a)
            }
        });
        var f = location.protocol + "//" + location.host,
            g = $(a.currentTarget).attr("href"),
            h = g.replace(f, "");
        h != g && DBRouter.navigate(h)
    },
    viewDocumentModal: function(a) {
        var b = this,
            c = $(a.currentTarget).data("id"),
            d = b.collection.documents.findWhere({
                _id: c
            });
        b.$("#modal-view-document .view-prev, #modal-view-document .view-next, #modal-view-document .view-left .viewport-inner img").off("click").on("click", b.switchDocumentPageView), b.$("#modal-view-document .view-bar-control .ion-ios-heart").parent().off("click").on("click", b.triggerLikeDocument), b.$("#modal-view-document .ion-chatbubble-working").parent().off("click").on("click", function() {
            b.$("#modal-view-document .comment-field .cm-txt").focus()
        }), b.$("#modal-view-document .comment-field .cm-txt").off("keyup").on("keyup", b.triggerCommentDocument).autosize();
        var e = $(window).height() - 60;
        b.$("#modal-view-document .view-right").css("height", e + "px"), b.$("#modal-view-document .view-left").css("height", e + "px"), b.$("#modal-view-document .viewport").css("height", e + "px"), b.$("#modal-view-document .modal-view, #modal-view-document .view-left, #modal-view-document .view-right, #modal-view-document .viewport").css("min-height", 0), b.$("#modal-view-document .view-left .viewport-inner img").css("max-height", e + "px"), b.$('#modal-view-document .view-left .viewport-inner[data-page="1"] img').on("load", function(a) {
            b.$("#modal-view-document .view-left .viewport-inner i").addClass("hidden"), b.$("#modal-view-document .view-left .viewport-inner img").removeClass("hidden")
        }), b.$("#modal-view-document").modal("show"), b.$("#modal-view-document").on("hidden.bs.modal", function() {
            var b = "undefined" != typeof $(a.currentTarget).data("href") && "" !== $(a.currentTarget).data("href") ? $(a.currentTarget).data("href") : d.get("username");
            DBRouter.navigate(b)
        })
    },
    switchDocumentPageView: function(a) {
        a.preventDefault();
        var b = this,
            c = b.$("#modal-view-document .viewport").data("cur_page"),
            d = b.$("#modal-view-document .viewport").data("total_page");
        $(a.currentTarget).hasClass("view-prev") ? 1 == c ? c = d : c -= 1 : ($(a.currentTarget).hasClass("view-next") || $(a.currentTarget).parent().hasClass("viewport-inner")) && (c == d ? c = 1 : c += 1), b.$("#modal-view-document .viewport-inner").addClass("hidden"), b.$('#modal-view-document .viewport-inner[data-page="' + c + '"]').removeClass("hidden"), b.$("#modal-view-document .viewport").data("cur_page", c)
    },
    triggerLikeDocument: function(a) {
        if (a.preventDefault(), $(a.currentTarget).hasClass("disabled")) return !1;
        var b = this,
            c = $(a.currentTarget).data("id"),
            d = b.collection.documents.findWhere({
                _id: c
            });
        return "undefined" == typeof d ? !1 : ($(a.currentTarget).addClass("disabled"), d.toSaveDocumentLike(), void d.save({}, {
            success: function(c, d) {
                d.response.liked ? ($(a.currentTarget).addClass("liked"), $(a.currentTarget).closest(".grid-item").find(".social-bar .like_count").addClass("liked")) : ($(a.currentTarget).removeClass("liked"), $(a.currentTarget).closest(".grid-item").find(".social-bar .like_count").removeClass("liked")), $(a.currentTarget).parent().hasClass("view-bar-control") ? d.response.liked ? ($(a.currentTarget).html('<i class="ion-ios-heart"></i> Unlike'), b.$("#modal-view-document .view-right .social-bar .ion-ios-heart").parent().addClass("liked").html('<i class="ion-ios-heart"></i> ' + d.response.total_likes)) : ($(a.currentTarget).html('<i class="ion-ios-heart"></i> Like'), b.$("#modal-view-document .view-right .social-bar .ion-ios-heart").parent().removeClass("liked").html('<i class="ion-ios-heart"></i> ' + d.response.total_likes)) : $(a.currentTarget).closest(".grid-item").find(".social-bar .like_count").html('<i class="ion-ios-heart"></i> ' + d.response.total_likes), $(a.currentTarget).removeClass("disabled")
            },
            error: function(c, d) {
                b.pushNotification({
                    type: "error",
                    message: d.responseJSON.msg
                }), $(a.currentTarget).removeClass("disabled")
            }
        }))
    },
    getCaret: function(a) {
        if (a.selectionStart) return a.selectionStart;
        if (document.selection) {
            a.focus();
            var b = document.selection.createRange();
            if (null == b) return 0;
            var c = a.createTextRange(),
                d = c.duplicate();
            return c.moveToBookmark(b.getBookmark()), d.setEndPoint("EndToStart", c), d.text.length
        }
        return 0
    },
    triggerCommentDocument: function(a) {
        if ($(a.currentTarget).hasClass("disabled")) return !1;
        var b = this,
            c = $(a.currentTarget).data("id"),
            d = b.collection.documents.findWhere({
                _id: c
            }),
            e = $(a.currentTarget).val();
        if ("undefined" == typeof d) return !1;
        if (27 == a.keyCode) $(a.currentTarget).val("");
        else if (13 == a.keyCode) {
            if (a.shiftKey) {
                var f = b.getCaret(b);
                return b.value = e.substring(0, f - 1) + "\n" + e.substring(f, e.length), !0
            }
            return e = e.trim(), "" == e ? !1 : ($(a.currentTarget).blur(), $(a.currentTarget).addClass("disabled"), d.toSaveDocumentComment(), d.save({
                comment: e
            }, {
                patch: !0,
                success: function(c, d) {
                    var c = c.toJSON();
                    c.comment = e;
                    var f = _.template($("#document-comment-tmpl").html())(c),
                        g = $(a.currentTarget).data("loc");
                    $(f).insertBefore($(a.currentTarget).parent()), "undefined" != typeof g || ($(a.currentTarget).closest(".grid-item").find(".comments-num").html('<i class="ion-chatbubble-working"></i> ' + d.response.total_comments), b.$grid.masonry()), $(a.currentTarget).val("").removeClass("disabled").trigger("autosize.resize"), b.$grid.masonry()
                },
                error: function(c, d) {
                    b.pushNotification({
                        type: "error",
                        message: d.responseJSON.msg
                    }), $(a.currentTarget).removeClass("disabled")
                }
            }), !1)
        }
    },
    popupCenterWindow: function(a, b, c, d) {
        var e = void 0 != window.screenLeft ? window.screenLeft : screen.left,
            f = void 0 != window.screenTop ? window.screenTop : screen.top,
            g = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
            h = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
            i = g / 2 - c / 2 + e,
            j = h / 2 - d / 2 + f;
        if (-1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome")) window.location.href = a;
        else {
            window.open(a, b, "scrollbars=yes, width=" + c + ", height=" + d + ", top=" + j + ", left=" + i, "_blank");
            window.focus
        }
    },
    setCookie: function(a, b, c) {
        "undefined" == typeof c && (c = 7300);
        var d = new Date;
        d.setTime(d.getTime() + 24 * c * 60 * 60 * 1e3);
        var e = "expires=" + d.toUTCString();
        document.cookie = a + "=" + b + "; " + e
    },
    getCookie: function(a) {
        var b = document.cookie.split(a + "=");
        return 2 == b.length ? b.pop().split(";").shift() : null
    },
    expireCookie: function(a) {
        document.cookie = encodeURIComponent(a) + "=deleted; expires=" + new Date(0).toUTCString() + "; path=/"
    },
    setStorageData: function(a, b) {
        return "undefined" != typeof Storage ? (localStorage[a] = b, !0) : !1
    },
    getStorageData: function(a) {
        return "undefined" != typeof Storage && "undefined" != typeof localStorage[a] ? localStorage[a] : null
    },
    removeStorageData: function(a) {
        return "undefined" != typeof Storage && localStorage.removeItem(a), !1
    },
    popupLoginModal: function(a) {
        window.clicked_element = null, "function" != typeof window.loginCallback && (window.loginCallback = function() {
            null != window.clicked_element ? window.location.href = $(window.clicked_element.currentTarget).attr("href") : window.location.reload(!0)
        }), "function" != typeof window.signUpComplete && (window.signUpComplete = function(a, b) {
            "undefined" != typeof b && b ? 5 == b ? $("#modal-login .error-noti").html("<p>You have cancelled the social signup.</p>") : $("#modal-login .error-noti").html("<p>Sorry, some unexpected errors occur while sign you up. Please try again later.</p>") : (window.loginCallback(), $("#modal-login .error-noti").empty())
        }), $("#modal-login").find(".panel-login, .panel-signup").addClass("hidden");
        var b = "login";
        "undefined" != typeof a && "undefined" != typeof a.currentTarget && (b = $(a.currentTarget).data("target")), "login" == b ? $("#modal-login .panel-login").removeClass("hidden") : $("#modal-login .panel-signup").removeClass("hidden"), $("#modal-login").modal("show")
    },
    popupLoginRegister: function(a) {
        var b = this,
            c = $(a.currentTarget).data("href"),
            d = $(a.currentTarget).data("title"),
            e = 440,
            f = 460;
        b.popupCenterWindow(c, d, e, f)
    },
    triggerSocialLogin: function(a) {
        var b = this;
        $("#modal-login .error-noti").empty(), b.popupLoginRegister(a)
    },
    triggerSwitchModal: function(a) {
        var b = $(a.currentTarget).data("target");
        $("#modal-login .error-noti").empty(), "login" == b ? ($("#modal-login .panel-login").removeClass("hidden"), $("#modal-login .panel-signup").addClass("hidden")) : ($("#modal-login .panel-login").addClass("hidden"), $("#modal-login .panel-signup").removeClass("hidden"))
    },
    requestOauthApi: function(a) {
        var b = this,
            c = $(a.currentTarget).data("target"),
            d = new DB.User;
        if ($("#modal-login .error-noti").empty(), "login" == c) {
            var e = $('#modal-login .panel-login input[name="email"]').val(),
                f = $('#modal-login .panel-login input[name="password"]').val();
            d.toOauthLogin()
        } else {
            var e = $('#modal-login .panel-signup input[name="email"]').val(),
                f = $('#modal-login .panel-signup input[name="password"]').val();
            d.toOauthRegister()
        }
        d.save({}, {
            emulateJSON: !0,
            data: {
                email: e,
                password: f
            },
            success: function(a, c) {
                $("#modal-login .error-noti").html('<p style="color:green;">' + c.msg + "</p>"), window.loginCallback(b, JSON.stringify(c.response.user))
            },
            error: function(a, b) {
                $("#modal-login .error-noti").html("<p>" + b.responseJSON.msg + "</p>")
            }
        }), d.resetUrl()
    },
    toggleSupportBox: function(a) {
        a.preventDefault();
        var b = this;
        "undefined" == typeof b.collection.faqs && (b.collection.faqs = new DB.Faqs), b.$(".support_bottom").addClass("disabled"), b.$(".box_help").addClass("hidden"), b.$(".box_help_one").removeClass("hidden"), 0 == b.$(".box_help_one .list_result_search_help li").length && b.collection.faqs.fetch({
            reset: !0,
            data: {
                pin: 1
            },
            success: function(a, c) {
                var d = _.template($("#bottom_faq_tmpl").html());
                b.$(".box_help_one .list_result_search_help .loading").addClass("hidden"), _.each(a.toJSON(), function(a) {
                    var c = d(a);
                    b.$(".box_help_one .list_result_search_help").append(c)
                }), _.bindAll(b, "bindViewFaqDetail"), b.bindViewFaqDetail()
            }
        })
    },
    closeSupportBox: function(a) {
        a.preventDefault();
        var b = this;
        b.$(".box_help").addClass("hidden"), b.$(".support_bottom").removeClass("disabled")
    },
    bindViewFaqDetail: function() {
        var a = this;
        a.$(".box_help_one .list_result_search_help a").on("click", function(b) {
            b.preventDefault(), b.stopPropagation(), a.$(".box_help_three .content_help").children().not(".close_mess, .input-group").remove();
            var c = $(b.currentTarget).data("id");
            isNaN(c) || (c = c.toString());
            var d = a.collection.faqs.findWhere({
                    _id: c
                }),
                e = _.template($("#bottom_faq_detail_tmpl").html())(d.toJSON());
            $(e).insertBefore(a.$(".box_help_three .content_help .close_mess")), a.$(".box_help").addClass("hidden"), a.$(".box_help_three").removeClass("hidden")
        })
    },
    toggleSupportSubmitIssue: function(a) {
        a.preventDefault();
        var b = this;
        $(a.currentTarget).hasClass("guest_user") ? b.popupLoginModal(a) : (b.$(".box_help").addClass("hidden"), b.$(".box_help_two").removeClass("hidden"), b.$(".box_help_two .close_mess").on("click", function(c) {
            c.preventDefault(), b.$(".box_help").addClass("hidden"), $(a.currentTarget).closest(".box_help").removeClass("hidden")
        }))
    },
    triggerSubmitFaq: function(a) {
        a.preventDefault();
        var b = this,
            c = new DB.Faq,
            d = b.$('.box_help_two input[name="subject"]').val(),
            e = b.$('.box_help_two textarea[name="description"]').val();
        return "" == d ? (alert("Please enter subject!"), !1) : "" == e ? (alert("Please describe your problem."), !1) : (b.$(".box_help_two .send_mess").addClass("disabled"), c.toSubmitIssue(), c.save({}, {
            data: {
                subject: d,
                description: e
            },
            emulateJSON: !0,
            success: function(a, c) {
                b.pushNotification({
                    type: "success",
                    message: c.msg
                }), b.$('.box_help_two input[name="subject"]').val(""), b.$('.box_help_two textarea[name="description"]').val(""), b.$(".box_help_two .send_mess").removeClass("disabled"), b.$(".box_help_two .close_mess").trigger("click")
            },
            error: function(a, c) {
                b.pushNotification({
                    type: "error",
                    message: c.responseJSON.msg
                }), b.$(".box_help_two .send_mess").removeClass("disabled")
            }
        }), c.resetUrl(), void 0)
    },
    triggerSearchFaq: function(a) {
        a.preventDefault();
        var b = this,
            c = $(a.currentTarget).parent().find(".input_search_help").val();
        return $(a.currentTarget).hasClass("search-btn") || 13 == a.keyCode ? void(c.length < 3 ? alert("Please type at least 3 characters to search.") : (b.$(".box_help .input_search_help").addClass("disabled").val(c), b.$(".box_help").addClass("hidden"), b.$(".box_help_one").removeClass("hidden"), b.$(".box_help_one .list_result_search_help").children().not(".loading").remove(), b.$(".box_help_one .list_result_search_help .loading").removeClass("hidden"), b.collection.faqs.fetch({
            reset: !0,
            data: {
                q: c,
                start: 0,
                limit: 20
            },
            success: function(a, c) {
                var d = _.template($("#bottom_faq_tmpl").html());
                b.$(".box_help_one .list_result_search_help .loading").addClass("hidden"), _.each(a.toJSON(), function(a) {
                    var c = d(a);
                    b.$(".box_help_one .list_result_search_help").append(c)
                }), _.bindAll(b, "bindViewFaqDetail"), b.bindViewFaqDetail(), b.$(".box_help .input_search_help").removeClass("disabled")
            }
        }))) : !1
    },
    triggerValidateEmail: function(a) {
        var b = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return b.test(a)
    },
    triggerValidateMobile: function(a) {
        var b = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/i;
        return b.test(a)
    },
    pushNotification: function(a) {
        if ("undefined" == typeof a.message) return !1;
        if ($('body .notify-block .notify[data-message="' + a.message.replace(/[^\w\s]/gi, "") + '"]').length) return !1;
        "undefined" == typeof a.position && (a.position = "bl"), "undefined" == typeof a.type && (a.type = "info");
        var b = _.template($("#new_notification_tmpl").html()),
            c = b(a),
            d = $(c);
        "tr" == a.position ? $("body .notity-top-right").append(d) : "br" == a.position ? $("body .notity-bottom-right").append(d) : $("body .notity-bottom-left").append(d), ("undefined" == typeof a.pin || 1 != a.pin) && setTimeout(function() {
            d.fadeOut(1e3, function() {
                this.remove()
            })
        }, 5e3)
    },
    popupConfirm: function(a, b, c) {
        var d = _.template($("#new_confirmation_tmpl").html());
        if ("undefined" == typeof a) e = "Do you really want to continue;";
        else if ("object" == typeof a) var e = "undefined" != typeof a.message ? a.message : "Do you really want to continue;",
            f = "undefined" != typeof a.yes_title ? a.yes_title : "Yes",
            g = "undefined" != typeof a.cancel_title ? a.cancel_title : "Cancel";
        else var e = a;
        var h = d({
                message: e,
                yes_title: f || "Yes",
                cancel_title: g || "Cancel"
            }),
            i = $(h),
            j = i.find(".modal");
        $("body").addClass("modal-open").append(i), j.addClass("in").show().find(".btn-yes, .btn-cancel").click(function(a) {
            j.removeClass("in").hide(), $("body").removeClass("modal-open"), i.remove(), $(a.currentTarget).hasClass("btn-yes") && "function" == typeof b && b(), $(a.currentTarget).hasClass("btn-cancel") && "function" == typeof c && c()
        })
    },
    stripHtml: function(a) {
        var b = document.createElement("DIV");
        return b.innerHTML = a, b.textContent || b.innerText || ""
    },
    trimString: function(a, b) {
        if (a.length <= b) return a;
        var c = a.substr(0, b);
        return c.substr(0, Math.min(c.length, c.lastIndexOf(" ")))
    },
    fakeClick: function(a, b) {
        if (b.click) b.click();
        else if (document.createEvent && a.target !== b) {
            var c = document.createEvent("MouseEvents");
            c.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null);
            b.dispatchEvent(c)
        }
    },
    parseURL: function(a) {
        var b, c, d, e = document.createElement("a"),
            f = {};
        for (e.href = a, b = e.search.replace(/^\?/, "").split("&"), d = 0; d < b.length; d++) c = b[d].split("="), f[c[0]] = c[1];
        return {
            protocol: e.protocol,
            host: e.host,
            hostname: e.hostname,
            port: e.port,
            pathname: e.pathname,
            search: e.search,
            searchObject: f,
            hash: e.hash
        }
    },
    triggerApplyContributor: function() {
        var a = this,
            b = a.$('#modal-contributor input[name="name"]').val(),
            c = a.$('#modal-contributor input[name="email"]').val(),
            d = a.$('#modal-contributor input[name="mobile"]').val(),
            e = [],
            f = a.$('#modal-contributor input[name="agree_term"]').is(":checked"),
            g = function(b, c) {
                a.$("#modal-contributor #contributor-message").html(_.template($("#new_modal_notice_tmpl").html())({
                    type: b,
                    message: c
                })).find(".ion-android-close").off("click").on("click", function() {
                    a.$("#modal-contributor #contributor-message").empty()
                })
            };
        if (a.$('#modal-contributor input[name="design_url[]"]').each(function() {
                e.push($(this).val())
            }), a.$("#modal-contributor #contributor-message").empty(), a.$("#modal-contributor .form-group").removeClass("has-error"), f)
            if ("" == b) a.$('#modal-contributor input[name="name"]').parents(".form-group").addClass("has-error"), g("error", "Please enter your name.");
            else if (a.triggerValidateEmail(c))
                if ("" == d) a.$('#modal-contributor input[name="mobile"]').parents(".form-group").addClass("has-error"), g("error", "Please enter a valid contact numbers.");
                else if (2 != e.length) a.$('#modal-contributor input[name="design_url[]"]').parents(".form-group").addClass("has-error"), g("error", "Please enter at least two url of your designs using DesignBold tools.");
                else {
                    var h = new DB.User({
                        name: b,
                        email: c,
                        mobile: d,
                        design_url: e,
                        agree_term: f
                    });
                    h.toApplyContributor(), h.save({}, {
                        success: function(b, c) {
                            a.$("#modal-contributor input").val(""), g("info", c.msg)
                        },
                        error: function(a, b) {
                            g("error", b.responseJSON.msg)
                        }
                    })
                } else a.$('#modal-contributor input[name="email"]').parents(".form-group").addClass("has-error"), g("error", "Please enter a valid email.");
        else g("error", "Please agree with our Terms & Conditions.")
    },
    triggerSendContact: function() {
        var a = this,
            b = a.$('.contact-box input[name="name"]').val(),
            c = a.$('.contact-box input[name="email"]').val(),
            d = a.$('.contact-box textarea[name="content"]').val(),
            e = function(b, c) {
                a.$(".contact-box #contact-message").html(_.template($("#new_modal_notice_tmpl").html())({
                    type: b,
                    message: c
                })).find(".ion-android-close").off("click").on("click", function() {
                    a.$(".contact-box #contact-message").empty()
                })
            };
        if (a.$(".contact-box #contact-message").empty(), a.$(".contact-box .form-group").removeClass("has-error"), "" == b) a.$('.contact-box input[name="name"]').parents(".form-group").addClass("has-error"), e("error", "Please enter your name.");
        else if (a.triggerValidateEmail(c))
            if ("" == d) a.$('.contact-box textarea[name="content"]').parents(".form-group").addClass("has-error"), e("error", "Please enter some information about your request.");
            else {
                var f = new DB.User({
                    name: b,
                    email: c,
                    content: d
                });
                f.toSendContact(), f.save({}, {
                    success: function(b, c) {
                        a.$(".contact-box input").val(""), a.$(".contact-box textarea").val(""), e("info", c.msg)
                    },
                    error: function(a, b) {
                        e("error", b.responseJSON.msg)
                    }
                })
            }
        else a.$('.contact-box input[name="email"]').parents(".form-group").addClass("has-error"), e("error", "Please enter a valid email.")
    }
}), 
DB.Router = Backbone.Router.extend({
    routes: {
        welcome: "redirector",
        login: "redirector",
        "login/designbold": "redirector",
        register: "redirector",
        logout: "redirector",
        account: "account",
        "account/verify/:token": "redirector",
        "account/reset/:token": "redirector",
        invoices: "invoices",
        "workspace(/:target)(/:label_id)": "workspace",
        "design/discover(/)": "redirector",
        "design/trial(/)": "redirector",
        "token/refresh": "redirector",
        support: "redirector",
        "tutorial(s)(/:uri)": "redirector",
        "blog(/:uri)": "redirector",
        "collection(/:slug)(/q/:keyword)": "collection",
        "stream(/q/:keyword)": "stream",
        "users(/:alphabet)(/q/:keyword)": "users",
        "design/view/:_id(/:token)": "design_view",
        ":username(/:tab)": "profile",
        "*a": "redirector"
    },
    initialize: function(a) {
        var b = this;
        if (b.topbar_view = new DB.TopbarView(a), "undefined" != typeof a && "undefined" != typeof a.header_all_doctype && "undefined" != typeof a.header_all_doctype_alb && "undefined" != typeof a.session_user) {
            var c = _.template($("#create-design-tmpl").html())({
                session_user: jQuery.parseJSON(a.session_user),
                header_all_doctype: jQuery.parseJSON(a.header_all_doctype),
                header_all_doctype_alb: jQuery.parseJSON(a.header_all_doctype_alb)
            });
            $("body").append(c)
        }
    },
    collection: function(a, b) {
        null == a && (a = "all"), null == b && (b = "");
        var c = this,
            d = function(a, b) {
                var d = _.template($("#collection-tmpl").html())(c.collection_data.data);
                $("#db_app_content").html(d);
                var e = new DB.Medias;
                e.toFetchLayouts(), "undefined" != typeof c.DBView && (c.DBView.undelegateEvents(), c.DBView.delegateDBLoader()), c.DBView = new DB.CollectionView({
                    collection: e,
                    doctype: a,
                    keyword: b
                }), c.DBView.startDBLoader(), c.DBView.loadLayouts()
            };
        c.topbar_view.toggleTopbarNav("collection"), "undefined" != typeof c.collection_data ? d(a, b) : $.ajax({
            url: window.location.href,
            dataType: "json",
            success: function(e) {
                c.collection_data = e, $("body").append(JSON.parse(c.collection_data.tmpl)), d(a, b)
            }
        })
    },
    stream: function(a) {
        null == a && (a = "");
        var b = this,
            c = function(a) {
                var c = _.template($("#stream-tmpl").html())(b.stream_data.data);
                $("#db_app_content").html(c);
                var d = new DB.Documents,
                    e = new DB.DocumentTypes;
                "undefined" != typeof b.DBView && (b.DBView.undelegateEvents(), b.DBView.delegateDBLoader()), b.DBView = new DB.StreamView({
                    collection: {
                        documents: d,
                        doctypes: e
                    },
                    keyword: a
                }), b.DBView.startDBLoader(), b.DBView.loadDocuments()
            };
        b.topbar_view.toggleTopbarNav("stream"), "undefined" != typeof b.stream_data ? c(a) : $.ajax({
            url: window.location.href,
            dataType: "json",
            success: function(d) {
                b.stream_data = d, $("body").append(JSON.parse(b.stream_data.tmpl)), c(a)
            }
        })
    },
    users: function(a, b) {
        null == a && (a = "all"), null == b && (b = "");
        var c = this,
            d = function(a, b) {
                $("body").append(JSON.parse(c.users_data.tmpl));
                var d = _.template($("#users-tmpl").html())(c.users_data.data);
                $("#db_app_content").html(d);
                var e = new DB.Users;
                "undefined" != typeof c.DBView && (c.DBView.undelegateEvents(), c.DBView.delegateDBLoader()), c.DBView = new DB.UsersView({
                    collection: e,
                    alphabet: a,
                    keyword: b
                }), c.DBView.startDBLoader(), c.DBView.loadUsers()
            };
        c.topbar_view.toggleTopbarNav("users"), "undefined" != typeof c.users_data ? d(a, b) : $.ajax({
            url: window.location.href,
            dataType: "json",
            success: function(e) {
                c.users_data = e, d(a, b)
            }
        })
    },
    design_view: function(a) {
        if (-1 != ["stream", "profile"].indexOf($(".navbar-nav.navbar-left li.current").data("tab"))) return !1;
        var b = this;
        "undefined" != typeof b.design_view_data ? b.profile(b.design_view_data.data.user.username, "profile", b.design_view_data) : $.ajax({
            url: window.location.href,
            dataType: "json",
            success: function(a) {
                b.design_view_data = a, $("body").append(JSON.parse(b.design_view_data.tmpl)), b.profile(b.design_view_data.data.user.username, "profile", b.design_view_data)
            }
        })
    },
    profile: function(a, b, c) {
        if (null == a) return alert("Sorry, you have gone to restricted area!"), window.location.href = "/", !1;
        null == b && (b = "design");
        var d = this,
            e = function(a, b, c) {
                d.profile_data_current = c, c.data.tab = b;
                var e = _.template($("#profile-tmpl").html())(c.data);
                $("#db_app_content").html(e);
                var f = "undefined" != typeof c.data.user.hash_id ? c.data.user.hash_id : "me",
                    g = new DB.User({
                        _id: f,
                        link: $(".show_cover .thumb").attr("href")
                    });
                if (g.set(c.data.user), "followers" == b) {
                    $(".bar-doctype-profile .list_info_user").data("target", "followers").find("li").removeClass("active"), $('.bar-doctype-profile .list_info_user li[data-target="followers"]').addClass("active");
                    var h = new DB.Users;
                    h.toFetchUserFollowers(f), "undefined" != typeof d.DBView && (d.DBView.undelegateEvents(), d.DBView.delegateDBLoader()), d.DBView = new DB.ProfileView({
                        collection: {
                            user: g,
                            followers: h
                        }
                    }), d.DBView.startDBLoader(), d.DBView.loadUserFollowers()
                } else if ("following" == b) {
                    $(".bar-doctype-profile .list_info_user").data("target", "following").find("li").removeClass("active"), $('.bar-doctype-profile .list_info_user li[data-target="following"]').addClass("active");
                    var h = new DB.Users;
                    h.toFetchUserFollowing(f), "undefined" != typeof d.DBView && (d.DBView.undelegateEvents(), d.DBView.delegateDBLoader()), d.DBView = new DB.ProfileView({
                        collection: {
                            user: g,
                            followers: h
                        }
                    }), d.DBView.startDBLoader(), d.DBView.loadUserFollowing()
                } else {
                    $(".bar-doctype-profile .list_info_user").data("target", "design").find("li").removeClass("active"), $('.bar-doctype-profile .list_info_user li[data-target="design"]').addClass("active");
                    var i = new DB.Documents;
                    if (i.toFetchUserDocument(f), "undefined" != typeof d.DBView && (d.DBView.undelegateEvents(), d.DBView.delegateDBLoader()), "undefined" != typeof c.data.document) {
                        var j = new DB.Document({
                            _id: c.data.document._id
                        });
                        j.set(c.data.document), d.DBView = new DB.ProfileView({
                            model: j,
                            collection: {
                                user: g,
                                documents: i
                            }
                        }), d.DBView.startDBLoader(), d.DBView.startViewDocument(), d.DBView.loadUserDocuments()
                    } else d.DBView = new DB.ProfileView({
                        collection: {
                            user: g,
                            documents: i
                        }
                    }), d.DBView.startDBLoader(), d.DBView.loadUserDocuments()
                }
            };
        d.topbar_view.toggleTopbarNav("profile"), "undefined" == typeof d.profile_data && (d.profile_data = []), "undefined" != typeof c && null != c ? e(a, b, c) : "undefined" != typeof d.profile_data[a] ? e(a, b, d.profile_data.username) : $.ajax({
            url: window.location.href,
            dataType: "json",
            success: function(c) {
                d.profile_data.username = c, $("body").append(JSON.parse(d.profile_data.username.tmpl)), e(a, b, d.profile_data.username)
            }
        })
    },
    workspace: function(a, b) {
        null == a && (a = "my-design"), null == b && (b = "");
        var c = this,
            d = function(a, b) {
                var d = _.template($("#workspace-tmpl").html())(c.workspace_data.data);
                $("#db_app_content").html(d);
                var e = c.workspace_data.data.user.hash_id,
                    f = new DB.User({
                        _id: e
                    }),
                    g = new DB.Documents;
                g.toFetchUserDocument(e);
                var h = new DB.UserLabels;
                "undefined" != typeof c.workspace_data.data.user_labels && h.set(c.workspace_data.data.user_labels), "undefined" != typeof c.DBView && (c.DBView.undelegateEvents(), c.DBView.delegateDBLoader()), c.DBView = new DB.WorkspaceView({
                    target: a,
                    label_id: b,
                    model: f,
                    collection: {
                        labels: h,
                        documents: g
                    }
                }), c.DBView.startDBLoader(), c.DBView.loadWorkspaceDocuments()
            };
        c.topbar_view.toggleTopbarNav("profile"), "undefined" != typeof c.workspace_data ? d(a, b) : $.ajax({
            url: window.location.href,
            dataType: "json",
            success: function(e) {
                c.workspace_data = e, $("body").append(JSON.parse(c.workspace_data.tmpl)), d(a, b)
            }
        })
    },
    account: function() {
        var a = this,
            b = function() {
                var b = _.template($("#account-tmpl").html())(a.account_data.data);
                $("#db_app_content").html(b);
                var c = new DB.User({
                    _id: a.account_data.data.user.hash_id
                });
                "undefined" != typeof a.DBView && (a.DBView.undelegateEvents(), a.DBView.delegateDBLoader()), a.DBView = new DB.AccountView({
                    model: c
                }), a.DBView.startDBLoader()
            };
        a.topbar_view.toggleTopbarNav("profile"), "undefined" != typeof a.account_data ? b() : $.ajax({
            url: window.location.href,
            dataType: "json",
            success: function(c) {
                a.account_data = c, $("body").append(JSON.parse(a.account_data.tmpl)), b()
            }
        })
    },
    invoices: function() {
        var a = this,
            b = function() {
                var b = _.template($("#invoices-tmpl").html())(a.invoices_data.data);
                $("#db_app_content").html(b);
                var c = new DB.User({
                    _id: a.invoices_data.data.user.hash_id
                });
                "undefined" != typeof a.DBView && (a.DBView.undelegateEvents(), a.DBView.delegateDBLoader());
                var d = new DB.UserInvoices;
                a.DBView = new DB.InvoicesView({
                    collection: {
                        user: c,
                        invoices: d
                    }
                }), a.DBView.startDBLoader(), a.DBView.loadUserInvoices()
            };
        a.topbar_view.toggleTopbarNav("profile"), "undefined" != typeof a.invoices_data ? b() : $.ajax({
            url: window.location.href,
            dataType: "json",
            success: function(c) {
                a.invoices_data = c, $("body").append(JSON.parse(a.invoices_data.tmpl)), b()
            }
        })
    },
    redirector: function() {
        window.location.reload()
    }
}),
DB.StaticRouter = Backbone.Router.extend({
    routes: {
        contributor: "contributor",
        "contributor/apply": "contributor_apply"
    },
    initialize: function() {
        var a = this;
        a.dbView = new DB.View
    },
    contributor: function() {
        var a = this;
        $('a[data-action="apply"]').off("click").on("click", function() {
            $("#modal-login").length > 0 ? (a.navigate("contributor/apply", {
                trigger: !1
            }), a.dbView.popupLoginModal()) : $("#modal-contributor").modal("show")
        })
    },
    contributor_apply: function() {
        var a = this;
        a.contributor(), $("#modal-login").length > 0 ? a.dbView.popupLoginModal() : $("#modal-contributor").modal("show")
    }
});
var DBRouter = {};
var DB = DB || {};
DB.zoomRate = 1, DB.loadedFont = {
    Helvetica: !0,
    "Times New Roman": !0
},
DB.fontSize = [12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 48, 56, 64, 72, 80, 88, 96, 104, 120, 144],
    DB.zoomList = [12.5, 16.7, 25, 33.3, 50, 67, 100, 150, 200, 300, 400, 500], DB.filterPreset = JSON.parse('[{"name":"The Blues","blur":-14,"brightness":63,"contrast":-37,"tint":0,"saturation":-26,"vignette":0,"xpro":-23},{"name":"Edge","blur":-53,"brightness":10,"contrast":-24,"tint":49,"saturation":26,"vignette":0,"xpro":29},{"name":"Selfie","brightness":10,"contrast":-12,"tint":-50,"saturation":-12,"vignette":56,"xpro":50},{"name":"Festive","blur":-7,"brightness":10,"contrast":21,"saturation":24,"xpro":40},{"name":"Rosie","blur":-14,"brightness":0,"contrast":55,"tint":-73,"saturation":-28,"vignette":0,"xpro":27},{"name":"Drama","blur":0,"brightness":-10,"contrast":21,"tint":60,"saturation":-34,"vignette":50,"xpro":80},{"name":"Epic","blur":1,"brightness":6,"contrast":20,"saturation":-14,"vignette":39,"xpro":50},{"name":"Grayscale","brightness":15,"contrast":-20,"saturation":-100},{"name":"Nordic","blur":0,"brightness":15,"contrast":-16,"tint":0,"saturation":-50,"vignette":0,"xpro":0},{"name":"Summer","blur":0,"brightness":10,"contrast":14,"tint":-46,"saturation":18,"vignette":25,"xpro":30},{"name":"Street","blur":-7,"brightness":-7,"contrast":21,"tint":0,"saturation":-95,"vignette":50,"xpro":0},{"name":"Retro","blur":0,"brightness":0,"contrast":-14,"tint":14,"saturation":-18,"vignette":40,"xpro":69},{"name":"Whimsical","blur":-19,"brightness":43,"contrast":-15,"tint":-79,"saturation":-53,"vignette":21,"xpro":60},{"name":"Cali","blur":0,"brightness":22,"contrast":-46,"tint":0,"saturation":38,"vignette":0,"xpro":27}]'), DB.elementMedias = [], DB.filterLocked = !1, DB.presetPerPage = 5, DB.curPresetPage = 1, DB.filterQueue = {}, DB.defaultColorPalette = ["#124E79", "#BB1854", "#198819", "#137BFF", "#675661", "#E08F29"], DB.colorPalette = [], DB.actionArray = [], DB.currentHistory = 0, $.fn.forceLayout = function() {
    if (0 === this.length) return this;
    var a = this.get(0);
    return (a = window.getComputedStyle(a)) && a.getPropertyValue("left"), this
}, 