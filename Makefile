#
#  Copyright 2018 Nalej
# 

# Name of the target applications to be built
APPS=web

# Use global Makefile for common targets
export
%:
	$(MAKE) -f Makefile.angular $@
