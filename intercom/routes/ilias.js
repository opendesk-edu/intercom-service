/**
 * SPDX-License-Identifier: AGPL-3.0-only
 * SPDX-FileCopyrightText: 2024-2025 Univention GmbH
 * SPDX-FileCopyrightText: 2026 openDesk Edu Team
 */

const express = require("express");
const router = express.Router();

const { createProxyMiddleware } = require("http-proxy-middleware");

const { stripIntercomCookies, massageCors, logger } = require("../utils");
const { corsOptions, logLevel, ilias } = require("../config");

/**
 * @name /ilias/
 * @desc
 * Proxy for ILIAS LMS (REST API, file upload/download).
 * Adds the proper Authorization Header via OIDC token exchange.
 */
if (ilias.enabled && ilias.url) {
  router.use(
    "/",
    createProxyMiddleware({
      target: ilias.url,
      logLevel,
      logger,
      changeOrigin: true,
      pathRewrite: {
        "^/ilias": "",
      },
      onProxyReq: function onProxyReq(proxyReq, req, res) {
        stripIntercomCookies(proxyReq);
        if (!req.appSession[ilias.session_storage_key]) {
          logger.info(
            "No ILIAS session found in appSession. Likely ILIAS is not configured",
          );
          return;
        }
        proxyReq.setHeader(
          "authorization",
          `Bearer ${req.appSession[ilias.session_storage_key]}`,
        );
      },
      onProxyRes: function (proxyRes, req, res) {
        massageCors(req, proxyRes, corsOptions.origin);
      },
    }),
  );
} else {
  router.use("/", (req, res) => {
    res.status(404).json({ error: "ILIAS integration is not enabled" });
  });
}

module.exports = router;
